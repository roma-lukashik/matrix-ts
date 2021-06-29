import { Softmax } from '.'
import { randn, shape } from '../../matrix'

describe('Softmax', () => {
  const input = randn(13, 13, 8)

  it('#forward', () => {
    const softmax = new Softmax(13 * 13 * 8, 10)
    expect(shape(softmax.forward(input))).toEqual([10])
  })

  it('#backward', () => {
    const softmax = new Softmax(13 * 13 * 8, 10)
    const gradient = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    expect(shape(softmax.backward(input, gradient, 0.005))).toEqual([13 * 13 * 8])
  })
})
