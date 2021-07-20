import { nonzero } from '../utils/math'
import { arrlen, copy } from '../utils/array'
import { Matrix, MatrixAxes, MatrixN, SubMatrix } from '../types'
import { arange } from '../creation'
import { isMatrixN, matrixn, ndim } from '../geometry'
import { MatrixBinaryOperator } from '../binary-operation'
import { notnullish } from '../utils/function'

export type AggregateMatrixOperator = <
  T extends Matrix,
  K extends MatrixAxes<T>
>(matrix: T, ...axes: K) => SubMatrix<T, K>

export const aggregator = (fn: MatrixBinaryOperator): AggregateMatrixOperator => (matrix, ...axes) =>
  aggregate(matrix, dimensions(matrix, axes), fn)

const dimensions = <T extends Matrix>(matrix: T, axes: MatrixAxes<T>): MatrixAxes<T> =>
  desc(allAxesByDefault(matrix, axes))

const allAxesByDefault = <T extends Matrix>(matrix: T, axes: MatrixAxes<T>): MatrixAxes<T> =>
  nonzero(arrlen(axes)) ? axes : allaxes(matrix)

const allaxes = <T extends Matrix>(matrix: T): MatrixAxes<T> =>
  arange(ndim(matrix)) as MatrixAxes<T>

const desc = <T extends number[]>(arr: T): T =>
  copy(arr).sort((a, b) => b - a) as T

const aggregate = <
  T1 extends Matrix,
  T2 extends MatrixAxes<T1>,
  T3 extends SubMatrix<T1, T2>,
>(matrix: T1, [d0, ...dn]: T2, operator: MatrixBinaryOperator): T3 => {
  if (isMatrixN(matrix) && notnullish(d0)) {
    return aggregate(broadcast(matrix, d0, operator), dn, operator) as T3
  }
  return matrix as T3
}

const broadcast = (matrix: MatrixN, axis: number, operator: MatrixBinaryOperator): Matrix => {
  if (nonzero(axis) && ndim(matrix) > 1) {
    return matrix.map((x) => broadcast(matrixn(x), axis - 1, operator))
  }
  return matrix.reduce(operator)
}
