import { diff } from 'jest-diff'
import { matcherHint } from 'jest-matcher-utils'
import { Matrix, nmap } from '../../src'
import { is0dim } from '../../src/core/is0dim'
import { isNdim } from '../../src/core/isndim'
import { len } from '../../src/core/len'
import { zip } from '../../src/utils/array'
import { round } from '../../src/utils/math'

const eps = 1e-3

const equal = (a: Matrix, b: Matrix): boolean =>
  isNdim(a) && isNdim(b) ?
    len(a) === len(b) && zip(a, b).every(([x, y]) => is0dim(x) && is0dim(y) ? x === y : equal(x, y)) :
    a === b

export const toEqualMatrix: jest.CustomMatcher = (received: Matrix, expected: Matrix) => {
  const r = nmap(received, (x: number) => round(x, eps))
  const e = nmap(expected, (x: number) => round(x, eps))
  const pass = equal(r, e)
  return {
    pass,
    message: () => {
      const name = pass ? 'not.toEqualMatrix' : 'toEqualMatrix'
      const diffString = diff(r, e, { includeChangeCounts: true })
      return matcherHint(`.${name}`) + '\n\n' + diffString
    }
  }
}
