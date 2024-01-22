import { describe, expect, it, vi } from 'vitest'
import { useEffectOnce } from '../hooks/use-effect-once'
import { renderHook } from '@testing-library/react'

describe('use effect once', () => {
  it('should run provided effect only once', () => {
    const mockEffect = vi.fn()
    const { rerender } = renderHook(() => useEffectOnce(mockEffect))

    expect(mockEffect).toHaveBeenCalledOnce()
    rerender()
    expect(mockEffect).toHaveBeenCalledOnce()
  })

  it('should run provided cleanup on unmount', () => {
    const mockEffectCleanup = vi.fn()
    const mockEffect = vi.fn().mockReturnValue(mockEffectCleanup)
    const { unmount } = renderHook(() => useEffectOnce(mockEffect))

    expect(mockEffectCleanup).not.toHaveBeenCalled()
    unmount()
    expect(mockEffectCleanup).toHaveBeenCalledOnce()
  })
})
