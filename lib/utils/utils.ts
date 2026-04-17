import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 * - 중복된 Tailwind 클래스를 자동으로 병합
 * - 조건부 클래스 적용 지원
 * - clsx와 tailwind-merge의 기능을 결합
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
