'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

const ALLOWED_IMAGE_HOSTS = ['picsum.photos']
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

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
  const safeImages = useMemo(
    () => [...new Set(images)].filter(isSafeImageUrl),
    [images],
  )

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null)
  const rafRef = useRef<number[]>([])
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  const resetZoom = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const openAt = useCallback(
    (i: number) => {
      // Cancel any in-flight close animation
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      rafRef.current.forEach(cancelAnimationFrame)
      rafRef.current = []

      setActiveIndex(i)
      resetZoom()

      // Double rAF: mount → paint initial hidden state → animate in
      const id1 = requestAnimationFrame(() => {
        const id2 = requestAnimationFrame(() => setIsVisible(true))
        rafRef.current = [id2]
      })
      rafRef.current = [id1]
    },
    [resetZoom],
  )

  const close = useCallback(() => {
    setIsVisible(false)
    resetZoom()
    // Fallback: force-unmount if transitionend never fires (reduced-motion, etc.)
    closeTimerRef.current = setTimeout(() => setActiveIndex(null), 350)
  }, [resetZoom])

  // Remove from DOM after exit animation
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return
      if (!isVisible) {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
        setActiveIndex(null)
      }
    },
    [isVisible],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      rafRef.current.forEach(cancelAnimationFrame)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + safeImages.length) % safeImages.length))
    resetZoom()
  }, [safeImages.length, resetZoom])

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % safeImages.length))
    resetZoom()
  }, [safeImages.length, resetZoom])

  // Keyboard + scroll lock
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

  // Native wheel listener — passive: false required to call preventDefault
  useEffect(() => {
    const el = dialogRef.current
    if (!el || activeIndex === null) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
      setZoom((z) => {
        const next = Math.min(MAX_ZOOM, Math.max(1, z + delta))
        if (next === 1) setPan({ x: 0, y: 0 })
        return next
      })
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [activeIndex])

  // Global drag listeners — fixes stuck drag when pointer leaves the image wrapper
  useEffect(() => {
    if (!isDragging) return
    const handleMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      setPan({
        x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
      })
    }
    const handleUp = () => {
      dragRef.current = null
      setIsDragging(false)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('blur', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('blur', handleUp)
    }
  }, [isDragging])

  // Double-click: toggle 1× ↔ 2×
  const handleDoubleClick = useCallback(() => {
    setZoom((z) => {
      if (z > 1) {
        setPan({ x: 0, y: 0 })
        return 1
      }
      return 2
    })
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return
      e.preventDefault()
      dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y }
      setIsDragging(true)
    },
    [zoom, pan],
  )

  if (safeImages.length === 0) return null

  const cursorClass =
    zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'

  return (
    <>
      {/* Thumbnail grid */}
      <div className="flex flex-wrap gap-2">
        {safeImages.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
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

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="이미지 확대 보기"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={close}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* Scale-in container */}
          <div
            className={`relative flex items-center justify-center transition-transform duration-300 ${
              isVisible ? 'scale-100' : 'scale-90'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoomable image */}
            <div
              className={`select-none overflow-hidden rounded-lg ${cursorClass}`}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
            >
              <Image
                src={safeImages[activeIndex]}
                alt={`첨부 이미지 ${activeIndex + 1} 확대`}
                width={800}
                height={600}
                className={`max-h-[85vh] max-w-[85vw] object-contain shadow-2xl ${
                  isDragging ? '' : 'transition-transform duration-150'
                }`}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: 'center',
                }}
                draggable={false}
              />
            </div>

            {/* Close */}
            <button
              type="button"
              aria-label="닫기"
              onClick={close}
              className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              ✕
            </button>

            {/* Zoom badge — desktop only, shown when zoomed */}
            {zoom > 1 && (
              <button
                type="button"
                aria-label="확대 초기화"
                onClick={resetZoom}
                className="absolute bottom-10 right-2 hidden rounded-full bg-black/60 px-2.5 py-1 text-xs text-white transition hover:bg-black/80 md:block"
              >
                {Math.round(zoom * 100)}%
              </button>
            )}

            {/* Prev / Next */}
            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="이전 이미지"
                  onClick={prev}
                  className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="다음 이미지"
                  onClick={next}
                  className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
                >
                  ›
                </button>
              </>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-2 flex gap-1.5">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`이미지 ${i + 1}로 이동`}
                  onClick={() => {
                    setActiveIndex(i)
                    resetZoom()
                  }}
                  className={`size-2 rounded-full transition ${
                    i === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
