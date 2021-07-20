import { ones } from './ones'

describe('ones', () => {
  it('returns 0x2 matrix', () => {
    expect(ones(2)).toEqual([1, 1])
  })

  it('returns 2x2x2x2x2 ones matrix', () => {
    const m = [
      [1, 1],
      [1, 1],
    ]
    expect(ones(2, 2, 2, 2, 2)).toEqual([
      [[m, m], [m, m]],
      [[m, m], [m, m]],
    ])
  })
})
