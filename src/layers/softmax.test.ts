import { forward } from './softmax'
import { randn, shape } from '../matrix'

describe('softmax', () => {
  it('works correctly', () => {
    const input = randn(13, 13, 8)
    expect(shape(forward(input, 10))).toEqual([10])
  })
})
