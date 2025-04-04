"use client"
import React, { useRef } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useAutoplay } from "./EmblaCarouselAutoplay"
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress"
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons"

type PropType = {
  images: string[] // Change slides to images
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { images, options } = props
  const progressNode = useRef<HTMLDivElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } = useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(
    emblaApi,
    progressNode as React.RefObject<HTMLElement>
  )

  return (
    <div className="embla bg-slate-200">
      <div className="embla__viewport--drag-free flex items-center justify-between">
        <PrevButton
          onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
        />
        <div className="embla__viewport flex-1" ref={emblaRef}>
          <div className="embla__container">
            {images.map((src, index) => (
              <div className="embla__slide" key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="embla__slide__img  w-full h-[300px] md:h-[700px] object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        <NextButton
          onClick={() => onAutoplayButtonClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
        />
      </div>
      <div className="embla__controls">
        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button>
        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : "embla__progress--hidden"
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel