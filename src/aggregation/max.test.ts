import { max } from './max'
import { arange } from '../creation/arange'
import { reshape } from '../geometry'

describe('max', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(max(m)).toBe(2)
    expect(max(m, 0)).toBe(2)
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(max(m)).toEqual(6)
    expect(max(m, 0)).toEqual([5, 6])
    expect(max(m, 1)).toEqual([2, 4, 6])
    expect(max(m, 0, 1)).toEqual(6)
    expect(max(m, 1, 0)).toEqual(6)
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(max(m)).toEqual(8)
    expect(max(m, 0)).toEqual([[5, 6], [7, 8]])
    expect(max(m, 1)).toEqual([[3, 4], [7, 8]])
    expect(max(m, 2)).toEqual([[2, 4], [6, 8]])
    expect(max(m, 0, 1)).toEqual([7, 8])
    expect(max(m, 0, 2)).toEqual([6, 8])
    expect(max(m, 1, 0)).toEqual([7, 8])
    expect(max(m, 1, 2)).toEqual([4, 8])
    expect(max(m, 2, 0)).toEqual([6, 8])
    expect(max(m, 2, 1)).toEqual([4, 8])
    expect(max(m, 0, 1, 2)).toEqual(8)
    expect(max(m, 0, 2, 1)).toEqual(8)
    expect(max(m, 1, 0, 2)).toEqual(8)
    expect(max(m, 1, 2, 0)).toEqual(8)
    expect(max(m, 2, 0, 1)).toEqual(8)
    expect(max(m, 2, 1, 0)).toEqual(8)
  })
})
