import { min } from './min'
import { arange } from '../creation/arange'
import { reshape } from '../geometry'

describe('min', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(min(m)).toBe(1)
    expect(min(m, 0)).toBe(1)
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(min(m)).toEqual(1)
    expect(min(m, 0)).toEqual([1, 2])
    expect(min(m, 1)).toEqual([1, 3, 5])
    expect(min(m, 0, 1)).toEqual(1)
    expect(min(m, 1, 0)).toEqual(1)
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(min(m)).toEqual(1)
    expect(min(m, 0)).toEqual([[1, 2], [3, 4]])
    expect(min(m, 1)).toEqual([[1, 2], [5, 6]])
    expect(min(m, 2)).toEqual([[1, 3], [5, 7]])
    expect(min(m, 0, 1)).toEqual([1, 2])
    expect(min(m, 0, 2)).toEqual([1, 3])
    expect(min(m, 1, 0)).toEqual([1, 2])
    expect(min(m, 1, 2)).toEqual([1, 5])
    expect(min(m, 2, 0)).toEqual([1, 3])
    expect(min(m, 2, 1)).toEqual([1, 5])
    expect(min(m, 0, 1, 2)).toEqual(1)
    expect(min(m, 0, 2, 1)).toEqual(1)
    expect(min(m, 1, 0, 2)).toEqual(1)
    expect(min(m, 1, 2, 0)).toEqual(1)
    expect(min(m, 2, 0, 1)).toEqual(1)
    expect(min(m, 2, 1, 0)).toEqual(1)
  })
})
