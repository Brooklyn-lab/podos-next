import dynamic from 'next/dynamic'
import { Container } from '@/components/Container'
import { HeaderContent } from '@/components/TextContent/HeaderContent'
import { type Locale } from '@/config/i18n'
import { getReviews, type ReviewItem } from '@/lib/payload'
import plTranslations from '@/translations/pl/reviews.json'
import uaTranslations from '@/translations/ua/reviews.json'
import styles from './Reviews.module.scss'

const ReviewsSliderSkeleton = () => (
  <div className={styles.skeletonGrid}>
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className={styles.skeletonCard} />
    ))}
  </div>
)

const ReviewsList = dynamic(() => import('./components/ReviewsList').then((m) => m.ReviewsList), {
  loading: () => <ReviewsSliderSkeleton />,
})

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

const BOOKSY_URL = 'https://booksy.com/pl-pl/289895_podos_podologia_13750_wroclaw'

type ReviewsSectionProps = {
  locale: Locale
}

const ReviewsSkeleton = () => (
  <section className={styles.reviews} id='reviews'>
    <Container>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
      </div>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </Container>
  </section>
)

export const ReviewsSection = async ({ locale }: ReviewsSectionProps) => {
  const reviews = await getReviews()
  const t = translations[locale]

  if (!reviews || reviews.length === 0) {
    return <ReviewsSkeleton />
  }

  const formattedReviews = reviews.map((review: ReviewItem) => ({
    reviewerName: review.reviewerName,
    rating: review.rating,
    reviewDate: review.reviewDate,
    reviewContent: review.reviewContent,
    service: review.service,
    isVerified: review.isVerified,
  }))

  return (
    <section className={styles.reviews} id='reviews'>
      <Container>
        <div className={styles.headerRow}>
          <HeaderContent title={t.title} description={t.description} />
          <div className={styles.linkRow}>
            <a href={BOOKSY_URL} target='_blank' rel='noopener noreferrer' className={styles.booksyLink}>
              {t.allReviews}
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M7 17L17 7M17 7H7M17 7v10' />
              </svg>
            </a>
          </div>
        </div>
        <ReviewsList reviews={formattedReviews} verifiedLabel={t.verified} serviceLabel={t.service} />
      </Container>
    </section>
  )
}
