import styles from './ReviewCard.module.scss'

type ReviewCardProps = {
  reviewerName: string
  rating: number
  reviewDate: string
  reviewContent: string
  service?: string | null
  isVerified?: boolean
  verifiedLabel: string
  serviceLabel: string
}

export const ReviewCard = ({
  reviewerName,
  rating,
  reviewDate,
  reviewContent,
  service,
  isVerified,
  verifiedLabel,
  serviceLabel,
}: ReviewCardProps) => {
  const formattedDate = new Date(reviewDate).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const initial = reviewerName.charAt(0).toUpperCase()

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initial}</div>
        <div className={styles.meta}>
          <span className={styles.name}>{reviewerName}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>

      {isVerified && <span className={styles.verified}>{verifiedLabel}</span>}

      <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={i < rating ? styles.starFilled : styles.starEmpty}
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
          </svg>
        ))}
      </div>

      <p className={styles.content}>{reviewContent}</p>

      <div className={styles.footer}>
        {service && (
          <span className={styles.service}>
            {serviceLabel}: {service}
          </span>
        )}
      </div>
    </article>
  )
}
