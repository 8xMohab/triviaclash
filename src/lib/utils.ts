import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
export function validateTryParam(tryParam: string, triesLength: number): number {
    // Convert tryParam to a number
    const tryAsNumber = Number(tryParam);

    // If tryParam is NaN, return 0
    if (isNaN(tryAsNumber)) {
        return 0;
    }

    // If the tries list is empty, return 0
    if (triesLength === 0) {
        return 0;
    }

    // Clamp tryAsNumber to the range [1, triesLength]
    const clampedValue = Math.min(Math.max(tryAsNumber, 1), triesLength);

    // Convert back to 0-indexed by subtracting 1, ensure it's not negative
    return Math.max(clampedValue - 1, 0);
}