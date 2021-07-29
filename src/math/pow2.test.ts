import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'
import { pow2 } from './pow2'

describe('pow2', () => {
  it('passes simple case', () => {
    const m = reshape(arange(12), [3, 2, 2])

    expect(pow2(m)).toEqual([
      [[0, 1], [4, 9]],
      [[16, 25], [36, 49]],
      [[64, 81], [100, 121]],
    ])
  })
})
