import React from 'react'
import { ArrowBack } from '../svgs'
import { useSwiper } from 'swiper/react'

interface ArrowBackProps {
    className?: string
    onClick?: () => void
}

export default function ArrowBackWrapper({className, onClick}: ArrowBackProps) {

  const swipper = useSwiper()
  return (
    <ArrowBack className={className} onClick={() => swipper.slidePrev()} />
  )
}
