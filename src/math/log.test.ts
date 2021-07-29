import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'
import { log } from './log'

describe('log', () => {
  it('passes simple case', () => {
    const m = reshape(arange(1, 13), [3, 2, 2])

    expect(log(m)).toEqualMatrix([
      [[Math.log(1), Math.log(2)], [Math.log(3), Math.log(4)]],
      [[Math.log(5), Math.log(6)], [Math.log(7), Math.log(8)]],
      [[Math.log(9), Math.log(10)], [Math.log(11), Math.log(12)]],
    ])
  })
})
