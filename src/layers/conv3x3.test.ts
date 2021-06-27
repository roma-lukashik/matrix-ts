import { backward, conv3x3, forward } from './conv3x3'
import { randn, shape } from '../matrix'
import { image } from './data'

describe('conv3x3', () => {
  it('#forward', () => {
    const output = forward(image, conv3x3(8))
    expect(shape(output)).toEqual([26, 26, 8])
  })

  it('#backward', () => {
    const gradient = randn(26, 26, 8)
    const output = backward(image, conv3x3(8), gradient)
    expect(shape(output)).toEqual([8, 3, 3])
  })
})
