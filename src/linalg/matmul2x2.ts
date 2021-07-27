import { Matrix2 } from '../types'
import { len } from '../core/len'
import { first } from '../utils/array'
import { error } from '../utils/function'
import { arange } from '../creation/arange'
import { at } from '../core/at'

export const matmul2x2 = (a: Matrix2, b: Matrix2): Matrix2 => {
  if (len(first(a)) !== len(b)) {
    return error('Input operand does not have enough dimensions.')
  }
  const columns = arange(len(first(b)))
  return a.map((row) =>
    columns.map((j) => row.reduce((sum, x, i) => sum + x * at(b, i, j), 0))
  )
}
