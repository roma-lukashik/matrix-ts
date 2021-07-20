import { meankeepdim } from './meankeepdim'
import { arange } from '../creation'
import { reshape } from '../geometry'

describe('meankeepdim', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(meankeepdim(m)).toEqual([1.5])
    expect(meankeepdim(m, 0)).toEqual([1.5])
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(meankeepdim(m)).toEqual([[3.5]])
    expect(meankeepdim(m, 0)).toEqual([[3, 4]])
    expect(meankeepdim(m, 1)).toEqual([[1.5], [3.5], [5.5]])
    expect(meankeepdim(m, 0, 1)).toEqual([[3.5]])
    expect(meankeepdim(m, 1, 0)).toEqual([[3.5]])
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(meankeepdim(m)).toEqual([[[4.5]]])
    expect(meankeepdim(m, 0)).toEqual([[[3, 4], [5, 6]]])
    expect(meankeepdim(m, 1)).toEqual([[[2, 3]], [[6, 7]]])
    expect(meankeepdim(m, 2)).toEqual([[[1.5], [3.5]], [[5.5], [7.5]]])
    expect(meankeepdim(m, 0, 1)).toEqual([[[4, 5]]])
    expect(meankeepdim(m, 0, 2)).toEqual([[[3.5], [5.5]]])
    expect(meankeepdim(m, 1, 0)).toEqual([[[4, 5]]])
    expect(meankeepdim(m, 1, 2)).toEqual([[[2.5]], [[6.5]]])
    expect(meankeepdim(m, 2, 0)).toEqual([[[3.5], [5.5]]])
    expect(meankeepdim(m, 2, 1)).toEqual([[[2.5]], [[6.5]]])
    expect(meankeepdim(m, 0, 1, 2)).toEqual([[[4.5]]])
    expect(meankeepdim(m, 0, 2, 1)).toEqual([[[4.5]]])
    expect(meankeepdim(m, 1, 0, 2)).toEqual([[[4.5]]])
    expect(meankeepdim(m, 1, 2, 0)).toEqual([[[4.5]]])
    expect(meankeepdim(m, 2, 0, 1)).toEqual([[[4.5]]])
    expect(meankeepdim(m, 2, 1, 0)).toEqual([[[4.5]]])
  })
})
