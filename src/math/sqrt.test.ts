import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'
import { sqrt } from './sqrt'

describe('sqrt', () => {
  it('passes simple case', () => {
    const m = reshape(arange(12), [3, 2, 2])

    expect(sqrt(m)).toEqualMatrix([
      [[Math.sqrt(0), Math.sqrt(1)], [Math.sqrt(2), Math.sqrt(3)]],
      [[Math.sqrt(4), Math.sqrt(5)], [Math.sqrt(6), Math.sqrt(7)]],
      [[Math.sqrt(8), Math.sqrt(9)], [Math.sqrt(10), Math.sqrt(11)]],
    ])
  })
})
