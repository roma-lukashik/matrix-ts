import { create } from './create'

describe('create', () => {
  const counter = (value: number = 0) => () => value++

  it('returns 0x2 matrix', () => {
    expect(create(counter(), 2)).toEqual([0, 1])
  })

  it('returns 2x2 matrix', () => {
    expect(create(counter(), 2, 2)).toEqual([
      [0, 1],
      [2, 3],
    ])
  })

  it('returns 2x2x2x2 matrix', () => {
    expect(create(counter(), 2, 2, 2, 2)).toEqual([
      [
        [[0, 1], [2, 3]],
        [[4, 5], [6, 7]],
      ],
      [
        [[8, 9], [10, 11]],
        [[12, 13], [14, 15]],
      ],
    ])
  })
})
