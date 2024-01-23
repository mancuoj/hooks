import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useCounter } from '../hooks/use-counter'

describe('use counter', () => {
  it('should use counter', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
    expect(result.current.inc).toBeTypeOf('function')
    expect(result.current.dec).toBeTypeOf('function')
    expect(result.current.reset).toBeTypeOf('function')
    expect(result.current.setCount).toBeTypeOf('function')
  })

  it('should use default value', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(1))
    act(() => result.current.inc())
    expect(result.current.count).toBe(2)
  })

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter())
    act(() => result.current.dec())
    expect(result.current.count).toBe(-1)
  })

  it('should set counter', () => {
    const { result } = renderHook(() => useCounter(2))
    act(() => result.current.setCount(10))
    expect(result.current.count).toBe(10)
  })

  it('should reset counter', () => {
    const { result } = renderHook(() => useCounter())
    act(() => {
      result.current.setCount(10)
      result.current.reset()
    })
    expect(result.current.count).toBe(0)
  })

  it('should set counter use previous value', () => {
    const { result } = renderHook(() => useCounter(3))
    act(() => result.current.setCount(prev => prev + 7))
    expect(result.current.count).toBe(10)
  })
})
