import { MatrixAxes, MatrixN, SubMatrix } from '../types'
import { len } from './len'
import { error, not, nullish } from '../utils/function'
import { matrixn } from './matrixn'
import { empty } from '../utils/array'

export const at = <
  T extends MatrixN,
  K extends MatrixAxes<T>
>(matrix: T, ...[d0, ...dn]: K): SubMatrix<T, K> =>
  _at(matrix, indexFromStart(d0, matrix), dn)

const _at = <
  T extends MatrixN,
  K extends MatrixAxes<T>,
  U extends SubMatrix<T, K>
>(matrix: T, i: number, dn: number[]): U => {
  if (nullish(matrix[i])) {
    return error(`Index ${i} out of bounds [0, ${len(matrix) - 1}].`)
  }
  return not(empty(dn)) ? at(matrixn(matrix[i]), ...dn) as U : matrix[i] as U
}

const indexFromStart = (d0: number, matrix: MatrixN) => d0 < 0 ? len(matrix) + d0 : d0
