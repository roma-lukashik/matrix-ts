import { ptp } from './ptp'
import { arange } from '../creation/arange'
import { reshape } from '../geometry'

describe('ptp', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(ptp(m)).toBe(1)
    expect(ptp(m, 0)).toBe(1)
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(ptp(m)).toEqual(5)
    expect(ptp(m, 0)).toEqual([4, 4])
    expect(ptp(m, 1)).toEqual([1, 1, 1])
    expect(ptp(m, 0, 1)).toEqual(5)
    expect(ptp(m, 1, 0)).toEqual(5)
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(ptp(m)).toEqual(7)
    expect(ptp(m, 0)).toEqual([[4, 4], [4, 4]])
    expect(ptp(m, 1)).toEqual([[2, 2], [2, 2]])
    expect(ptp(m, 2)).toEqual([[1, 1], [1, 1]])
    expect(ptp(m, 0, 1)).toEqual([6, 6])
    expect(ptp(m, 0, 2)).toEqual([5, 5])
    expect(ptp(m, 1, 0)).toEqual([6, 6])
    expect(ptp(m, 1, 2)).toEqual([3, 3])
    expect(ptp(m, 2, 0)).toEqual([5, 5])
    expect(ptp(m, 2, 1)).toEqual([3, 3])
    expect(ptp(m, 0, 1, 2)).toEqual(7)
    expect(ptp(m, 0, 2, 1)).toEqual(7)
    expect(ptp(m, 1, 0, 2)).toEqual(7)
    expect(ptp(m, 1, 2, 0)).toEqual(7)
    expect(ptp(m, 2, 0, 1)).toEqual(7)
    expect(ptp(m, 2, 1, 0)).toEqual(7)
  })
})
