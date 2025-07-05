'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { NavigationButton } from './components/NavigationButton'
import styles from './Slider.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'

interface SliderProps {
  children: React.ReactNode[]
  spaceBetween?: number
  slidesPerView?: number
  className?: string
  breakpoints?: {
    [key: number]: {
      slidesPerView: number
    }
  }
}

const defaultBreakpoints = {
  0: { slidesPerView: 1.4 },
  480: { slidesPerView: 1.4 },
  992: { slidesPerView: 2.5 },
  1200: { slidesPerView: 4.2 },
}

export const Slider = ({
  children,
  spaceBetween = 16,
  slidesPerView = 4.2,
  className = '',
  breakpoints = defaultBreakpoints,
}: SliderProps) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)

  return (
    <div className={`${styles.sliderWrapper} ${className}`}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current
          }
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
      >
        {children.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
        <div className={styles.navigation}>
          <NavigationButton ref={navigationPrevRef} direction='prev' iconName='slider-arrow' />
          <NavigationButton ref={navigationNextRef} direction='next' iconName='slider-arrow' />
        </div>
      </Swiper>
    </div>
  )
}
