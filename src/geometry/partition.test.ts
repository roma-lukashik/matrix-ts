import { partition } from './partition'

describe('partition', () => {
  it('returns 2x2 sample from 3x4 matrix', () => {
    const m = [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
    ]
    expect(partition(m, [1, 3], [2, 4])).toEqual([
      [2, 3],
      [2, 3],
    ])
  })
})
