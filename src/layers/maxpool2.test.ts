import { conv3x3, forward as conv3x3Forward } from './conv3x3'
import { shape } from '../matrix'
import { image } from './data'
import { forward } from './maxpool2'

describe('maxpool2', () => {
  it('works properly', () => {
    const output3x3 = conv3x3Forward(image, conv3x3(8))
    const output = forward(output3x3)
    expect(shape(output)).toEqual([13, 13, 8])
  })
})
