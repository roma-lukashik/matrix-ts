import { shape } from './shape'
import { ones } from '../creation/ones'

describe('shape', () => {
  it('returns [] for scalar', () => {
    expect(shape(2)).toEqual([])
  })

  it('returns [0] shape for an empty matrix', () => {
    expect(shape([])).toEqual([0])
  })

  it('returns 2x2 shape', () => {
    expect(shape(ones(2, 2))).toEqual([2, 2])
  })

  it('returns 4x3x2x1 shape', () => {
    expect(shape(ones(4, 3, 2, 1))).toEqual([4, 3, 2, 1])
  })
})
