import { conv3x3, forward } from './conv3x3'
import { shape } from '../matrix'
import { image } from './data'

describe('conv3x3', () => {
  it('works properly', () => {
    const conv = conv3x3(8)
    const output = forward(image, conv)
    expect(shape(output)).toEqual([26, 26, 8])
  })
})
