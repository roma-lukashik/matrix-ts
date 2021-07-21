import { add } from './add'
import { arange } from '../creation/arange'
import { reshape } from '../geometry'

describe('add', () => {
  it('adds scalars', () => {
    expect(add(2, 3)).toEqual(5)
  })

  it('adds 0x3 and 0x3 matrix', () => {
    const a = arange(1, 4)
    const b = arange(2, 5)
    const c = [3, 5, 7]

    expect(add(a, b)).toEqual(c)
    expect(add(b, a)).toEqual(c)
  })

  it('adds 4x3 and 0x3 matrix', () => {
    const a = reshape(arange(12), [4, 3])
    const b = arange(1, 4)
    const c = [
      [1, 3, 5],
      [4, 6, 8],
      [7, 9, 11],
      [10, 12, 14],
    ]

    expect(add(a, b)).toEqual(c)
    expect(add(b, a)).toEqual(c)
  })

  it('adds 2x3x3 and 2x1x3 matrix', () => {
    const a = reshape(arange(18), [2, 3, 3])
    const b = reshape(arange(6), [2, 1, 3])

    const c = [
      [
        [0, 2, 4],
        [3, 5, 7],
        [6, 8, 10],
      ],
      [
        [12, 14, 16],
        [15, 17, 19],
        [18, 20, 22],
      ],
    ]

    expect(add(a, b)).toEqual(c)
    expect(add(b, a)).toEqual(c)
  })

  it('throws an error if matrix cannot broadcast together', () => {
    const a = reshape(arange(3), [1, 3])
    const b = reshape(arange(4), [2, 2])

    expect(() => add(a, b)).toThrowError('Matrix could not be broadcast together.')
  })
})
