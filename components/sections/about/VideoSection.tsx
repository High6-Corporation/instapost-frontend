'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

interface VideoSectionProps {
  /** From GraphQL: fullwidthVideoSection (ACF File → AcfMediaItemConnectionEdge) */
  data?: {
    node: {
      mediaItemUrl: string | null
      guid: string | null
    } | null
  } | null
}

export function VideoSection({ data }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // mediaItemUrl follows the current site domain; guid is frozen at upload time
  // and can still point at an old one. sourceUrl is null for video files.
  const src = data?.node?.mediaItemUrl || data?.node?.guid || ''

  // Nothing uploaded (or the query failed) — render nothing rather than a
  // broken player. There is deliberately no local fallback file any more:
  // public/videos/ was removed from the repo.
  if (!src) return null

  const handlePlayClick = () => {
    setIsPlaying(true)
    // The click is a user gesture, so playback is allowed; muted start keeps
    // it safe on browsers that block unmuted autoplay.
    videoRef.current?.play().catch(() => undefined)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    // Rewind to the first-frame preview instead of leaving the last frame up.
    videoRef.current?.load()
  }

  return (
    <ScrollAnimationWrapper>
      <Section className="relative w-full overflow-hidden">
        {/* Video Container */}
        <div className="relative w-full aspect-video max-h-[600px]">
          {/*
            src stays constant across renders so pressing play never reloads the
            element. The #t=0.1 media fragment makes the browser paint the first
            frame without downloading the whole clip. No <source type="…"> is used
            on purpose — the CMS file may be mp4 or webm, and a hardcoded MIME type
            makes Safari refuse the mismatch.
          */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={`${src}#t=0.1`}
            playsInline
            muted
            preload="metadata"
            controls={isPlaying}
            onEnded={handleEnded}
          >
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay - 50% black, disappears when playing */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 transition-opacity duration-500 ${
              isPlaying ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          />

          {/* Play Button - Centered; once playing, native controls own pause/seek/unmute */}
          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlayClick}
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center group"
              aria-label="Play video"
            >
              <div className="relative flex h-[56px] w-[56px] items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:opacity-[0.8]">
                <Image
                  src="/icons/play-video.svg"
                  alt="Play"
                  width={56}
                  height={56}
                  className="object-contain ml-[2px]"
                />
              </div>
            </button>
          )}
        </div>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default VideoSection
