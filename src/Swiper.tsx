import { memo, useEffect, useRef } from 'react'
import SW from 'swiper'
import 'swiper/swiper-bundle.css'

interface Props {
  index: string
  viewCount: number
  children?: React.ReactElement[]
  callback?: (index: number) => void
}

const ratio = 0.96 // Can adjust by yourself

const Swiper: React.FC<Props> = ({ viewCount, callback, children, index }) => {
  const swiper = useRef<any>(null)

  useEffect(() => {
    swiper.current?.destroy(false)

    if (document.getElementById(`swiper-container-${index}`)) {
      swiper.current = new SW(`.swiper-container-${index}`, {
        resistanceRatio: 0,
        watchSlidesProgress: true,
        on: {
          init(th) {
            const { slides } = th
            const offsetAfter = th.width * ratio

            for (let i = 0; i < slides.length; i++) {
              const slide = slides.eq(i)
              const progress = slides[i]?.progress

              if (progress <= 0) {
                slide.transform(`translateX(${-progress * offsetAfter}px)`)
                slide.css('opacity', Number(progress) + viewCount)
              }

              slide.css('zIndex', 100 - i)
            }
          },
          setTranslate(th) {
            const { slides } = th as any

            const offsetAfter = th.width * ratio
            for (let i = 0; i < slides.length; i++) {
              const slide = slides.eq(i)
              const { progress } = slides[i]

              if (progress <= 0) {
                slide.transform(`translateX(${-progress * offsetAfter}px)`)
                slide.css('opacity', Number(progress) + viewCount)
              }
            }
          },
          setTransition(th, transition) {
            for (let i = 0; i < th.slides.length; i++) {
              const slide = th.slides.eq(i)
              slide.transition(transition)
            }
          },
          slideChangeTransitionEnd(th) {
            callback?.(th.activeIndex)
          }
        }
      })
    }

    swiper.current?.init()
  }, [viewCount, children, index, callback])

  return (
    <div className={`swiper-container swiper-container-${index}`} id={`swiper-container-${index}`} dir="rtl">
      <div className="swiper-wrapper">{children}</div>
    </div>
  )
}

export default memo(Swiper)
