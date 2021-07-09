import { nonzero } from '../../utils/math'
import { arrlen } from '../../utils/array'
import { Matrix, Matrix0, MatrixDimensions, MatrixN, NLevelNestedMatrix } from '../utils/types'
import { arange } from '../creation'
import { isMatrix0, matrixn, ndim } from '../geometry'
import { add, broadcast, MatrixBinaryOperator, multiply } from '../binary-operation'
import { isDefined } from '../../utils/function'

type AggregateMatrixOperator = {
  <T extends Matrix>(matrix: T): Matrix0
  <T extends Matrix, K extends MatrixDimensions<T>>(matrix: T, ...axes: K): NLevelNestedMatrix<T, K>
}

const aggregator = (fn: MatrixBinaryOperator): AggregateMatrixOperator => <
  T extends Matrix,
  K extends MatrixDimensions<T>
>(matrix: T, ...axes: K) =>
  aggregate(matrix, arrlen(axes) ? axes : arange(ndim(matrix)) as K, fn)

export const sum = aggregator(add)

export const prod = aggregator(multiply)

export const max = aggregator((a, b) => broadcast(a, b, Math.max))

export const min = aggregator((a, b) => broadcast(a, b, Math.min))

// Takes all matrix axes and aggregate all matrix elements by default.
const aggregate = <
  T1 extends Matrix,
  T2 extends MatrixDimensions<T1>,
  T3 extends NLevelNestedMatrix<T1, T2>,
>(matrix: T1, [d0, ...dn]: T2, operator: MatrixBinaryOperator): T3 => {
  if (isMatrix0(matrix) || !isDefined(d0)) {
    return matrix as unknown as T3
  }
  const nesting = aggregateNesting(matrix, d0, operator)
  const rest = dn.map((x) => x > d0 ? x - 1 : x)
  return aggregate(nesting, rest, operator) as T3
}

const aggregateNesting = (matrix: MatrixN, axis: number, operator: MatrixBinaryOperator): Matrix =>
  nonzero(axis) && ndim(matrix) > 1 ?
    matrix.map((x) => aggregateNesting(matrixn(x), axis - 1, operator)) :
    matrix.reduce(operator)
