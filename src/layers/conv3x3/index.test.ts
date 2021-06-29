import { Conv3x3 } from '.'
import { randn, shape } from '../../matrix'

describe('Conv3x3', () => {
  const input = randn(28, 28)

  it('#forward', () => {
    const conv3x3 = new Conv3x3(8)
    const output = conv3x3.forward(input)
    expect(shape(output)).toEqual([26, 26, 8])
  })

  it('#backward', () => {
    const conv3x3 = new Conv3x3(8)
    const gradient = randn(26, 26, 8)
    const output = conv3x3.backward(input, gradient, 0.05)
    expect(shape(output)).toEqual([8, 3, 3])
  })
})
