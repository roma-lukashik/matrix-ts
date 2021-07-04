import { Softmax } from '.'
import { create, shape } from '../../matrix'
import { normal } from '../../utils/random'

describe('Softmax', () => {
  const input = create(normal, 13, 13, 8)

  it('#forward', () => {
    const softmax = new Softmax({ inputLength: 13 * 13 * 8, outputLength: 10 })
    expect(shape(softmax.forward(input))).toEqual([10])
  })

  it('#backward', () => {
    const softmax = new Softmax({ inputLength: 13 * 13 * 8, outputLength: 10 })
    const gradient = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    expect(shape(softmax.backward(input, gradient, 0.005))).toEqual([13, 13, 8])
  })
})
