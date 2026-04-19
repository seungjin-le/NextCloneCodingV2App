'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

const ALLOWED_IMAGE_HOSTS = ['picsum.photos']

function isSafeImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === 'https:' &&
      ALLOWED_IMAGE_HOSTS.some(
        (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
      )
    )
  } catch {
    return false
  }
}

interface Props {
  images: string[]
}

export function ImageGallery({ images }: Props) {
  const safeImages = [...new Set(images)].filter(isSafeImageUrl)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + safeImages.length) % safeImages.length))
  }, [safeImages.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % safeImages.length))
  }, [safeImages.length])

  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [activeIndex, close, prev, next])

  if (safeImages.length === 0) return null

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {safeImages.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="relative size-24 overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-800 transition hover:border-zinc-500 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <Image
              src={src}
              alt={`첨부 이미지 ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="이미지 확대 보기"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={safeImages[activeIndex]}
              alt={`첨부 이미지 ${activeIndex + 1} 확대`}
              width={800}
              height={600}
              className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
            />

            <button
              type="button"
              aria-label="닫기"
              onClick={close}
              className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              ✕
            </button>

            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="이전 이미지"
                  onClick={prev}
                  className="absolute left-2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="다음 이미지"
                  onClick={next}
                  className="absolute right-2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                >
                  ›
                </button>
              </>
            )}

            <div className="absolute bottom-2 flex gap-1.5">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`이미지 ${i + 1}로 이동`}
                  onClick={() => setActiveIndex(i)}
                  className={`size-2 rounded-full transition ${i === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
