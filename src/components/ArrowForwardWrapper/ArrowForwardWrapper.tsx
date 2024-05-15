import React from 'react'
import { ArrowForward } from '../svgs'

interface ArrowForwardProps {
    className?: string
    onClick?: () => void
}

export default function ArrowForwardWrapper({className, onClick}: ArrowForwardProps) {
  return (
    <ArrowForward className={className} onClick={onClick}/>
  )
}
