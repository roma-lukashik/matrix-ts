import { prod } from './prod'
import { arange } from '../creation/arange'
import { reshape } from '../geometry'

describe('prod', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(prod(m)).toBe(2)
    expect(prod(m, 0)).toBe(2)
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(prod(m)).toEqual(720)
    expect(prod(m, 0)).toEqual([15, 48])
    expect(prod(m, 1)).toEqual([2, 12, 30])
    expect(prod(m, 0, 1)).toEqual(720)
    expect(prod(m, 1, 0)).toEqual(720)
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(prod(m)).toEqual(40320)
    expect(prod(m, 0)).toEqual([[5, 12], [21, 32]])
    expect(prod(m, 1)).toEqual([[3, 8], [35, 48]])
    expect(prod(m, 2)).toEqual([[2, 12], [30, 56]])
    expect(prod(m, 0, 1)).toEqual([105, 384])
    expect(prod(m, 0, 2)).toEqual([60, 672])
    expect(prod(m, 1, 0)).toEqual([105, 384])
    expect(prod(m, 1, 2)).toEqual([24, 1680])
    expect(prod(m, 2, 0)).toEqual([60, 672])
    expect(prod(m, 2, 1)).toEqual([24, 1680])
    expect(prod(m, 0, 1, 2)).toEqual(40320)
    expect(prod(m, 1, 0, 2)).toEqual(40320)
    expect(prod(m, 1, 2, 0)).toEqual(40320)
    expect(prod(m, 2, 0, 1)).toEqual(40320)
    expect(prod(m, 2, 1, 0)).toEqual(40320)
  })
})
