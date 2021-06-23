import { conv3x3, forward as conv3x3Forward } from './conv3x3'
import { randn, shape } from '../matrix'
import { image } from './data'
import { forward, backward } from './maxpool2'

describe('maxpool2', () => {
  it('forward', () => {
    const output3x3 = conv3x3Forward(image, conv3x3(8))
    const output = forward(output3x3)
    expect(shape(output)).toEqual([13, 13, 8])
  })

  it('backward', () => {
    const input3x3 = randn(26, 26, 8)
    const gradient = randn(13, 13, 8)
    const output = backward(input3x3, gradient)
    expect(shape(output)).toEqual([26, 26, 8])
  })
})
