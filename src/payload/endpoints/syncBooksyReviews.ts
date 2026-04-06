import type { PayloadHandler } from 'payload'

const BOOKSY_URL = 'https://booksy.com/pl-pl/289895_podos_podologia_13750_wroclaw'

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

async function fetchBooksyReviews(): Promise<BooksyReview[]> {
  const res = await fetch(BOOKSY_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      Accept: 'text/html',
    },
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`Booksy returned ${res.status}`)

  const html = await res.text()
  const match = html.match(/window\.__NUXT__=([\s\S]*?);<\/script>/)
  if (!match) throw new Error('Could not find __NUXT__ data on Booksy page')

  const data = eval(match[1])
  const reviews: BooksyReview[] = data?.state?.business?.reviews || []

  if (reviews.length === 0) throw new Error('No reviews found in Booksy SSR data')

  return reviews
}

export const syncBooksyReviews: PayloadHandler = async (req) => {
  if (!req.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const booksyReviews = await fetchBooksyReviews()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 'reviews' collection not in generated Payload types yet
    const existing = await (req.payload as any).find({
      collection: 'reviews',
      where: { booksyId: { exists: true } },
      limit: 0,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingIds = new Set(existing.docs.map((d: any) => d.booksyId))

    const newReviews = booksyReviews.filter((r) => !existingIds.has(r.id))

    let created = 0
    for (const r of newReviews) {
      const firstName = r.user?.first_name || ''
      const lastName = r.user?.last_name || ''

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (req.payload as any).create({
        collection: 'reviews',
        data: {
          reviewerName: `${firstName} ${lastName}`.trim() || 'Anonymous',
          rating: r.rank || 5,
          reviewDate: r.created || r.appointment_date || new Date().toISOString(),
          reviewContent: r.review || '',
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
      message: `Synced ${created} new reviews (${booksyReviews.length} total on Booksy, ${existingIds.size} already existed)`,
      created,
      total: booksyReviews.length,
      skipped: existingIds.size,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
