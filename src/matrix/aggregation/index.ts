import { nonzero } from '../../utils/math'
import { arrlen, copy } from '../../utils/array'
import { Matrix, Matrix0, MatrixDimensions, MatrixN, NLevelNestedMatrix, VectorN } from '../utils/types'
import { arange } from '../creation'
import { isMatrixN, matrixn, ndim, reshape, shape, size } from '../geometry'
import { add, broadcast, divide, MatrixBinaryOperator, multiply, subtract } from '../binary-operation'
import { defined } from '../../utils/function'
import { pow2, sqrt } from '../math'

type AggregateMatrixOperator = {
  <T extends Matrix>(matrix: T): Matrix0
  <T extends Matrix, K extends MatrixDimensions<T>>(matrix: T, ...axes: K): NLevelNestedMatrix<T, K>
}

const aggregator = (fn: MatrixBinaryOperator): AggregateMatrixOperator => <
  T extends Matrix,
  K extends MatrixDimensions<T>
>(matrix: T, ...axes: K) =>
  aggregate(matrix, sort(nonzero(arrlen(axes)) ? axes : arange(ndim(matrix))) as K, fn)

const sort = <T extends VectorN>(arr: T): T => copy(arr).sort((a, b) => b - a) as T

export const sum = aggregator(add)

export const prod = aggregator(multiply)

export const max = aggregator((a, b) => broadcast(a, b, Math.max))

export const min = aggregator((a, b) => broadcast(a, b, Math.min))

export const mean: AggregateMatrixOperator = <
  T extends Matrix,
  K extends MatrixDimensions<T>
>(matrix: T, ...axes: K) =>
  _mean(matrix, sum(matrix, ...axes))

const _mean = (original: Matrix, reduced: Matrix) =>
  divide(reduced, divide(size(original), size(reduced)))

// The standard deviation is the square root of the average of the squared deviations from the mean, i.e.,
// std = sqrt(mean(x)), where x = (a - a.mean())**2.
export const std: AggregateMatrixOperator = <
  T extends Matrix,
  K extends MatrixDimensions<T>
>(matrix: T, ...axes: K) =>
  sqrt(mean(pow2(subtract(matrix, keepdim(matrix, mean(matrix, ...axes), axes))) as T, ...axes))

// TODO: Use keepdim option to preserve number of dimensions.
const keepdim = (m1: Matrix, m2: Matrix, axes: VectorN) =>
  isMatrixN(m2) ? reshape(m2, shape(matrixn(m1)).map((x, i) => axes.includes(i) ? 1 : x)) : m2

// Takes all matrix axes and aggregate all matrix elements by default.
const aggregate = <
  T1 extends Matrix,
  T2 extends MatrixDimensions<T1>,
  T3 extends NLevelNestedMatrix<T1, T2>,
>(matrix: T1, [d0, ...dn]: T2, operator: MatrixBinaryOperator): T3 => {
  if (isMatrixN(matrix) && defined(d0)) {
    return aggregate(aggregateNesting(matrix, d0, operator), dn, operator) as T3
  }
  return matrix as unknown as T3
}

const aggregateNesting = (matrix: MatrixN, axis: number, operator: MatrixBinaryOperator): Matrix => {
  if (nonzero(axis) && ndim(matrix) > 1) {
    return matrix.map((x) => aggregateNesting(matrixn(x), axis - 1, operator))
  }
  return matrix.reduce(operator)
}
