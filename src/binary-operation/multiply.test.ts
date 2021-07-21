import { multiply } from './multiply'
import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'

describe('multiply', () => {
  it('multiplies scalars', () => {
    expect(multiply(2, 3)).toEqual(6)
  })

  it('multiplies 0x3 and 0x3 matrix', () => {
    const a = arange(1, 4)
    const b = arange(2, 5)
    const c = [2, 6, 12]

    expect(multiply(a, b)).toEqual(c)
    expect(multiply(b, a)).toEqual(c)
  })

  it('multiplies 4x3 and 0x3 matrix', () => {
    const a = reshape(arange(12), [4, 3])
    const b = arange(1, 4)
    const c = [
      [0, 2, 6],
      [3, 8, 15],
      [6, 14, 24],
      [9, 20, 33],
    ]

    expect(multiply(a, b)).toEqual(c)
    expect(multiply(b, a)).toEqual(c)
  })

  it('multiplies 2x3x3 and 2x1x3 matrix', () => {
    const a = reshape(arange(18), [2, 3, 3])
    const b = reshape(arange(6), [2, 1, 3])

    const c = [
      [
        [0, 1, 4],
        [0, 4, 10],
        [0, 7, 16],
      ],
      [
        [27, 40, 55],
        [36, 52, 70],
        [45, 64, 85],
      ],
    ]

    expect(multiply(a, b)).toEqual(c)
    expect(multiply(b, a)).toEqual(c)
  })

  it('throws an error if matrix cannot broadcast together', () => {
    const a = reshape(arange(3), [1, 3])
    const b = reshape(arange(4), [2, 2])

    expect(() => multiply(a, b)).toThrowError('Matrix could not be broadcast together.')
  })
})
