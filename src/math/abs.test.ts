import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'
import { abs } from './abs'

describe('abs', () => {
  it('passes simple case', () => {
    const m = reshape(arange(-6, 6), [3, 2, 2])

    expect(abs(m)).toEqual([
      [[6, 5], [4, 3]],
      [[2, 1], [0, 1]],
      [[2, 3], [4, 5]],
    ])
  })
})
