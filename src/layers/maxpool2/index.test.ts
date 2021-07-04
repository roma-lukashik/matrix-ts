import { Maxpool2 } from '.'
import { arange, reshape } from '../../matrix'

describe('Maxpool2', () => {
  const input = reshape(arange(5 * 5 * 4), [5, 5, 4])
  const gradient = reshape(arange(2 * 2 * 4), [2, 2, 4])

  it('#forward', () => {
    const maxpool2 = new Maxpool2()
    const output = maxpool2.forward(input)
    expect(output).toEqualMatrix([
      [
        [24, 25, 26, 27],
        [32, 33, 34, 35],
      ],
      [
        [64, 65, 66, 67],
        [72, 73, 74, 75],
      ],
    ])
  })

  it('#backward', () => {
    const maxpool2 = new Maxpool2()
    const output = maxpool2.backward(input, gradient)
    expect(output).toEqual([
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 2, 3],
        [0, 0, 0, 0],
        [4, 5, 6, 7],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [8, 9, 10, 11],
        [0, 0, 0, 0],
        [12, 13, 14, 15],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ])
  })
})
