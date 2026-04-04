'use client'

import { Slider } from '@/components/Slider'
import { ReviewCard } from '../ReviewCard'
import styles from './ReviewsList.module.scss'

type ReviewData = {
  reviewerName: string
  rating: number
  reviewDate: string
  reviewContent: string
  service?: string | null
  isVerified?: boolean
}

type ReviewsListProps = {
  reviews: ReviewData[]
  verifiedLabel: string
  serviceLabel: string
}

const breakpoints = {
  0: { slidesPerView: 1.05 },
  420: { slidesPerView: 1.3 },
  568: { slidesPerView: 1.8 },
  768: { slidesPerView: 2.4 },
  992: { slidesPerView: 3 },
  1200: { slidesPerView: 3.4 },
}

export const ReviewsList = ({ reviews, verifiedLabel, serviceLabel }: ReviewsListProps) => {
  return (
    <Slider className={styles.slider} breakpoints={breakpoints} spaceBetween={16} slidesPerView={3.4}>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          reviewerName={review.reviewerName}
          rating={review.rating}
          reviewDate={review.reviewDate}
          reviewContent={review.reviewContent}
          service={review.service}
          isVerified={review.isVerified}
          verifiedLabel={verifiedLabel}
          serviceLabel={serviceLabel}
        />
      ))}
    </Slider>
  )
}
