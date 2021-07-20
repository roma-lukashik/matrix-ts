import { zeros } from './zeros'

describe('zeros', () => {
  it('returns 0x2 matrix', () => {
    expect(zeros(2)).toEqual([0, 0])
  })

  it('returns 2x2x2x2x2 zero matrix', () => {
    const m = [
      [0, 0],
      [0, 0],
    ]
    expect(zeros(2, 2, 2, 2, 2)).toEqual([
      [[m, m], [m, m]],
      [[m, m], [m, m]],
    ])
  })
})
