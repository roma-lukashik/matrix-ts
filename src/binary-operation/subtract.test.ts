import { subtract } from './subtract'
import { arange } from '../creation'
import { reshape } from '../geometry'

describe('subtract', () => {
  it('subtracts scalars', () => {
    expect(subtract(3, 2)).toEqual(1)
  })

  it('subtracts 0x3 and 0x3 matrix', () => {
    const a = arange(1, 4)
    const b = arange(2, 5)

    expect(subtract(a, b)).toEqual([-1, -1, -1])
    expect(subtract(b, a)).toEqual([1, 1, 1])
  })

  it('subtracts 4x3 and 0x3 matrix', () => {
    const a = reshape(arange(12), [4, 3])
    const b = arange(1, 4)

    expect(subtract(a, b)).toEqual([
      [-1, -1, -1],
      [2, 2, 2],
      [5, 5, 5],
      [8, 8, 8],
    ])

    expect(subtract(b, a)).toEqual([
      [1, 1, 1],
      [-2, -2, -2],
      [-5, -5, -5],
      [-8, -8, -8],
    ])
  })

  it('subtracts 2x3x3 and 2x1x3 matrix', () => {
    const a = reshape(arange(18), [2, 3, 3])
    const b = reshape(arange(6), [2, 1, 3])

    expect(subtract(a, b)).toEqual([
      [
        [0, 0, 0],
        [3, 3, 3],
        [6, 6, 6],
      ],
      [
        [6, 6, 6],
        [9, 9, 9],
        [12, 12, 12],
      ],
    ])

    expect(subtract(b, a)).toEqual([
      [
        [0, 0, 0],
        [-3, -3, -3],
        [-6, -6, -6],
      ],
      [
        [-6, -6, -6],
        [-9, -9, -9],
        [-12, -12, -12],
      ],
    ])
  })

  it('throws an error if matrix cannot broadcast together', () => {
    const a = reshape(arange(3), [1, 3])
    const b = reshape(arange(4), [2, 2])

    expect(() => subtract(a, b)).toThrowError('Matrix could not be broadcast together.')
  })
})
