import { nmap } from './nmap'
import { reshape } from '../geometry/reshape'
import { arange } from '../creation/arange'

describe('nmap', () => {
  it('applies a callback for Matrix0', () => {
    expect(nmap(1, (x) => x + 1)).toEqual(2)
  })

  it('applies a callback for Matrix3', () => {
    const m = reshape(arange(12), [3, 2, 2])

    expect(nmap(m, (x) => x + 1)).toEqual([
      [[1, 2], [3, 4]],
      [[5, 6], [7, 8]],
      [[9, 10], [11, 12]],
    ])
  })
})
