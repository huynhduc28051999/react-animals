
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import './slideshowGallery.css'

let automaticInterval
const SlideshowGallery = ({
  ratio = '3:4',
  input = [],
  timeout = 5000,
  mode = 'automatic'
}) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const ratioWHArray = useMemo(() => ratio.split(':'), [ratio])
  const ratioWH = useMemo(() => ratioWHArray[0] / ratioWHArray[1], [ratioWHArray])
  const containerElm = useRef()
  const indexSlideRef = useRef(0)
  const getNewSlideIndex = (step) => {
    const numberSlide = input.length
    let newSlideIndex = indexSlideRef.current + step

    if (newSlideIndex >= numberSlide) newSlideIndex = 0
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1
    return newSlideIndex
  }
  const updateDimensions = useCallback(() => {
    const height = containerElm.current?.offsetWidth || 0
    containerElm.current.style.height = `${(height / ratioWH)}px`
  }, [containerElm, ratioWH])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    if (mode === 'automatic') {
      automaticInterval = setInterval(
        () => {
          const nextSlide = getNewSlideIndex(1)
          indexSlideRef.current = nextSlide
          setSlideIndex(nextSlide)
        },
        parseInt(timeout, 10)
      )
    }
    return () => {
      window.removeEventListener('resize', updateDimensions)
      if (automaticInterval) clearInterval(automaticInterval)
    }
  }, [])
  return (
    <div className='lp-slideshow-gallery'>
      <div className='container' ref={containerElm}>
        {
          input.map((image, index) => {
            return (
              <div
                key={index}
                className={
                  `slide ${slideIndex === index ? 'active' : ''}`
                }
              >
                <div className='number-text'>
                  {`${index + 1} / ${input.length}`}
                </div>
                <img className='image' src={image.medium} alt={index} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SlideshowGallery