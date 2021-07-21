import { sum } from './sum'
import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'

describe('sum', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(sum(m)).toBe(3)
    expect(sum(m, 0)).toBe(3)
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(sum(m)).toEqual(21)
    expect(sum(m, 0)).toEqual([9, 12])
    expect(sum(m, 1)).toEqual([3, 7, 11])
    expect(sum(m, 0, 1)).toEqual(21)
    expect(sum(m, 1, 0)).toEqual(21)
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(sum(m)).toEqual(36)
    expect(sum(m, 0)).toEqual([[6, 8], [10, 12]])
    expect(sum(m, 1)).toEqual([[4, 6], [12, 14]])
    expect(sum(m, 2)).toEqual([[3, 7], [11, 15]])
    expect(sum(m, 0, 1)).toEqual([16, 20])
    expect(sum(m, 0, 2)).toEqual([14, 22])
    expect(sum(m, 1, 0)).toEqual([16, 20])
    expect(sum(m, 1, 2)).toEqual([10, 26])
    expect(sum(m, 2, 0)).toEqual([14, 22])
    expect(sum(m, 2, 1)).toEqual([10, 26])
    expect(sum(m, 0, 1, 2)).toEqual(36)
    expect(sum(m, 1, 0, 2)).toEqual(36)
    expect(sum(m, 1, 2, 0)).toEqual(36)
    expect(sum(m, 2, 0, 1)).toEqual(36)
    expect(sum(m, 2, 1, 0)).toEqual(36)
  })
})
