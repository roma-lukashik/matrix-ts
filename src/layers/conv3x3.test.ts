import { Conv3x3 } from './conv3x3'
import { randn, shape } from '../matrix'
import { image } from './data'

describe('conv3x3', () => {
  it('#forward', () => {
    const conv3x3 = new Conv3x3(8)
    const output = conv3x3.forward(image)
    expect(shape(output)).toEqual([26, 26, 8])
  })

  it('#backward', () => {
    const conv3x3 = new Conv3x3(8)
    const gradient = randn(26, 26, 8)
    const output = conv3x3.backward(image, gradient, 0.05)
    expect(shape(output)).toEqual([8, 3, 3])
  })
})
