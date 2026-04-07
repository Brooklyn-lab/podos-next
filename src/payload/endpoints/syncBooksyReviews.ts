import type { PayloadHandler } from 'payload'

const BOOKSY_URL = 'https://booksy.com/pl-pl/289895_podos_podologia_13750_wroclaw'
const MAX_PAGES = 10

type BooksyReview = {
  id: number
  rank: number
  review: string
  user?: { first_name?: string; last_name?: string }
  created?: string
  appointment_date?: string
  verified?: boolean
  services?: { name: string }[]
}

function makeFingerprint(name: string, content: string): string {
  return `${name.toLowerCase().trim()}::${content.toLowerCase().trim().slice(0, 100)}`
}

async function fetchBooksyPage(page: number): Promise<BooksyReview[]> {
  const url = page === 1 ? BOOKSY_URL : `${BOOKSY_URL}?page=${page}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      Accept: 'text/html',
    },
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`Booksy returned ${res.status} for page ${page}`)

  const html = await res.text()
  const match = html.match(/window\.__NUXT__=([\s\S]*?);<\/script>/)
  if (!match) return []

  const data = eval(match[1])
  return data?.state?.business?.reviews || []
}

async function fetchAllBooksyReviews(): Promise<BooksyReview[]> {
  const allReviews: BooksyReview[] = []
  const seenIds = new Set<number>()

  for (let page = 1; page <= MAX_PAGES; page++) {
    const reviews = await fetchBooksyPage(page)
    if (reviews.length === 0) break

    let newOnPage = 0
    for (const r of reviews) {
      if (!seenIds.has(r.id)) {
        seenIds.add(r.id)
        allReviews.push(r)
        newOnPage++
      }
    }

    if (newOnPage === 0) break
  }

  if (allReviews.length === 0) throw new Error('No reviews found on Booksy')
  return allReviews
}

export const syncBooksyReviews: PayloadHandler = async (req) => {
  if (!req.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const booksyReviews = await fetchAllBooksyReviews()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 'reviews' collection not in generated Payload types yet
    const existing = await (req.payload as any).find({
      collection: 'reviews',
      pagination: false,
    })

     
    const existingFingerprints = new Set(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      existing.docs.map((d: any) => makeFingerprint(d.reviewerName || '', d.reviewContent || ''))
    )

    const newReviews = booksyReviews.filter((r) => {
      const name = `${r.user?.first_name || ''} ${r.user?.last_name || ''}`.trim() || 'Anonymous'
      return !existingFingerprints.has(makeFingerprint(name, r.review || ''))
    })

    let created = 0
    for (const r of newReviews) {
      if (!r.review?.trim()) continue

      const firstName = r.user?.first_name || ''
      const lastName = r.user?.last_name || ''

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (req.payload as any).create({
        collection: 'reviews',
        data: {
          reviewerName: `${firstName} ${lastName}`.trim() || 'Anonymous',
          rating: r.rank || 5,
          reviewDate: (r.created || r.appointment_date || new Date().toISOString()).split('T')[0],
          reviewContent: r.review.trim(),
          service: r.services?.[0]?.name || null,
          source: 'booksy',
          isVerified: r.verified ?? true,
          booksyId: r.id,
        },
      })
      created++
    }

    return Response.json({
      success: true,
      message: `Synced ${created} new reviews (${booksyReviews.length} total on Booksy, ${existingFingerprints.size} already existed)`,
      created,
      total: booksyReviews.length,
      skipped: existingFingerprints.size,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

export const resyncAllReviews: PayloadHandler = async (req) => {
  if (!req.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const booksyReviews = await fetchAllBooksyReviews()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (req.payload as any).find({
      collection: 'reviews',
      pagination: false,
      where: { source: { equals: 'booksy' } },
    })

     
    for (const doc of existing.docs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (req.payload as any).delete({ collection: 'reviews', id: doc.id })
    }

    let created = 0
    let skippedEmpty = 0
    for (const r of booksyReviews) {
      if (!r.review?.trim()) {
        skippedEmpty++
        continue
      }

      const firstName = r.user?.first_name || ''
      const lastName = r.user?.last_name || ''

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (req.payload as any).create({
        collection: 'reviews',
        data: {
          reviewerName: `${firstName} ${lastName}`.trim() || 'Anonymous',
          rating: r.rank || 5,
          reviewDate: (r.created || r.appointment_date || new Date().toISOString()).split('T')[0],
          reviewContent: r.review.trim(),
          service: r.services?.[0]?.name || null,
          source: 'booksy',
          isVerified: r.verified ?? true,
          booksyId: r.id,
        },
      })
      created++
    }

    return Response.json({
      success: true,
      message: `Deleted ${existing.docs.length} old reviews, created ${created} from ${booksyReviews.length} total Booksy reviews`,
      deleted: existing.docs.length,
      created,
      totalFromBooksy: booksyReviews.length,
      skippedEmpty,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
