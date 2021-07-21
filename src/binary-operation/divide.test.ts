import { divide } from './divide'
import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'

describe('divide', () => {
  it('divides scalars', () => {
    expect(divide(4, 2)).toEqual(2)
  })

  it('divides 0x3 and 0x3 matrix', () => {
    const a = [2, 4, 6]
    const b = [1, 2, 3]

    expect(divide(a, b)).toEqual([2, 2, 2])
    expect(divide(b, a)).toEqual([0.5, 0.5, 0.5])
  })

  it('divides 4x3 and 0x3 matrix', () => {
    const a = reshape(arange(1, 13), [4, 3])
    const b = arange(1, 4)

    expect(divide(a, b)).toEqual([
      [1, 1, 1],
      [4, 2.5, 2],
      [7, 4, 3],
      [10, 5.5, 4],
    ])

    expect(divide(b, a)).toEqualMatrix([
      [1, 1, 1],
      [0.25, 0.4, 0.5],
      [0.143, 0.25, 0.333],
      [0.1, 0.182, 0.25],
    ])
  })

  it('divides 2x3x3 and 2x1x3 matrix', () => {
    const a = reshape(arange(1, 19), [2, 3, 3])
    const b = reshape(arange(1, 7), [2, 1, 3])

    expect(divide(a, b)).toEqual([
      [
        [1, 1, 1],
        [4, 2.5, 2],
        [7, 4, 3],
      ],
      [
        [2.5, 2.2, 2],
        [3.25, 2.8, 2.5],
        [4, 3.4, 3],
      ],
    ])

    expect(divide(b, a)).toEqualMatrix([
      [
        [1, 1, 1],
        [0.25, 0.4, 0.5],
        [0.143, 0.25, 0.333],
      ],
      [
        [0.4, 0.455, 0.5],
        [0.308, 0.357, 0.4],
        [0.25, 0.294, 0.333],
      ],
    ])
  })

  it('throws an error if matrix cannot broadcast together', () => {
    const a = reshape(arange(3), [1, 3])
    const b = reshape(arange(4), [2, 2])

    expect(() => divide(a, b)).toThrowError('Matrix could not be broadcast together.')
  })
})
