import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import useCounter from '../hooks/use-counter'

describe('useCounter', () => {
  it('should increment', () => {
    const { result } = renderHook(() => useCounter())
    act(() => {
      result.current.inc()
    })
    expect(result.current.count).toBe(1)
  })
})
