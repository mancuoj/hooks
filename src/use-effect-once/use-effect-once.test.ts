import { renderHook } from '@testing-library/react'
import { useEffectOnce } from './use-effect-once'

const mockEffect = vi.fn()
const mockCleanup = vi.fn()
const mockEffectCleanup = vi.fn().mockReturnValue(mockCleanup)

describe('useEffectOnce()', () => {
  it('should run provided effect only once', () => {
    const { rerender } = renderHook(() => useEffectOnce(mockEffect))
    expect(mockEffect).toHaveBeenCalledOnce()
    rerender()
    expect(mockEffect).toHaveBeenCalledOnce()
  })

  it('should run provided cleanup on unmount', () => {
    const { unmount } = renderHook(() => useEffectOnce(mockEffectCleanup))
    expect(mockCleanup).not.toHaveBeenCalledOnce()
    unmount()
    expect(mockCleanup).toHaveBeenCalledOnce()
  })
})
