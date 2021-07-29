import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'
import { exp } from './exp'

describe('exp', () => {
  it('passes simple case', () => {
    const m = reshape(arange(12), [3, 2, 2])

    expect(exp(m)).toEqualMatrix([
      [[Math.exp(0), Math.exp(1)], [Math.exp(2), Math.exp(3)]],
      [[Math.exp(4), Math.exp(5)], [Math.exp(6), Math.exp(7)]],
      [[Math.exp(8), Math.exp(9)], [Math.exp(10), Math.exp(11)]],
    ])
  })
})
