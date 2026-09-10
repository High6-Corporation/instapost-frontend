'use client'

import { useState, useEffect } from 'react'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Image from 'next/image'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

interface VideoListItem {
  id: number
  src: string
}

interface VideoListSectionProps {
  /** From GraphQL: videoListSection[] → each row's video.node.guid */
  data?: Array<{ video: { node: { guid: string } } | null }> | null
}

// Fallback videos (local) — used only until the CMS list is wired/empty
const FALLBACK_VIDEOS = [
  '/videos/MY STRONG HOME_SUCCESS STORIES.webm',
  '/videos/MILKMAGIC_SUCCESS STORIES.webm',
  '/videos/CVMP_ SUCCESS STORIES.webm',
  '/videos/ONESIMUS_ SUCCESS STORIES.webm',
]

export function VideoListSection({ data }: VideoListSectionProps) {
  const videos: VideoListItem[] =
    data && data.length > 0
      ? data
          .map((item, i) => ({ id: i + 1, src: item.video?.node?.guid || '' }))
          .filter((v) => v.src)
      : FALLBACK_VIDEOS.map((src, i) => ({ id: i + 1, src }))

  // Only one video plays at a time; others show their first frame.
  const [playingId, setPlayingId] = useState<number | null>(null)

  // Same per-view as the "Why brands" slider: mobile = 2, tablet = 3, desktop = 4.
  const [perView, setPerView] = useState(4)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const updatePerView = () => {
      const width = window.innerWidth
      if (width < 768) setPerView(2)
      else if (width < 1024) setPerView(3)
      else setPerView(4)
    }
    updatePerView()
    window.addEventListener('resize', updatePerView)
    return () => window.removeEventListener('resize', updatePerView)
  }, [])

  // Stop the playing video whenever the visible set changes.
  useEffect(() => {
    setPlayingId(null)
  }, [perView, currentSlide])

  if (videos.length === 0) return null

  const isSlider = videos.length > perView
  const maxSlideIndex = Math.max(0, videos.length - perView)

  // Clamp slide index after a breakpoint change.
  useEffect(() => {
    if (currentSlide > maxSlideIndex) setCurrentSlide(maxSlideIndex)
  }, [maxSlideIndex, currentSlide])

  const renderCard = (video: VideoListItem) => (
    <div
      key={video.id}
      className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] bg-neutral-900"
    >
      {playingId === video.id ? (
        <video
          src={video.src}
          className="h-full w-full object-cover"
          controls
          autoPlay
          playsInline
          onEnded={() => setPlayingId(null)}
        />
      ) : (
        <>
          {/* First-frame preview (cheap: metadata only) */}
          <video
            src={`${video.src}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <button
            type="button"
            onClick={() => setPlayingId(video.id)}
            aria-label="Play video"
            className="group absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="/icons/play-button.svg"
              alt=""
              width={64}
              height={64}
              className="h-12 w-12 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16"
            />
          </button>
        </>
      )}
    </div>
  )

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-white py-[32px] md:py-[40px]">
        <Row className="!max-w-[1269px]">
          {isSlider ? (
            <>
              {/* Slider track (tablet/mobile) — 1 per slide */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / perView)}%)` }}
                >
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex-shrink-0 px-2"
                      style={{ width: `${100 / perView}%` }}
                    >
                      {renderCard(video)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev / Next pager — same style as the "Why brands" slider */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <span className="body-sm text-text-secondary">
                  {currentSlide + 1} / {maxSlideIndex + 1}
                </span>
                <button
                  onClick={() => setCurrentSlide(Math.min(maxSlideIndex, currentSlide + 1))}
                  disabled={currentSlide === maxSlideIndex}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            /* Desktop — 4 side-by-side */
            <div className="grid grid-cols-4 gap-6">{videos.map((video) => renderCard(video))}</div>
          )}
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default VideoListSection
