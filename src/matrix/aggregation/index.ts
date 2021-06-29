import * as math from '../../utils/math'
import { first } from '../../utils/array'
import { Matrix, Matrix0, MatrixDimensions, MatrixN, NLevelNestedMatrix, VectorN } from '../utils/types'
import { arange } from '../creation'
import { isMatrixN, len, matrixn, ndim } from '../geometry'
import { broadcast } from '../utils/broadcasting'

type AggregateMatrixOperator = {
  <T extends Matrix>(matrix: T): Matrix0;
  <T extends Matrix, K extends MatrixDimensions<T>>(matrix: T, axes: K): NLevelNestedMatrix<T, K>;
}

export const sum: AggregateMatrixOperator = <T extends Matrix>(
  matrix: T,
  axes?: MatrixDimensions<T>,
) =>
  aggregate(matrix, axes, (a, b) => broadcast(a, b, math.add))

export const max: AggregateMatrixOperator = <T extends Matrix>(
  matrix: T,
  axes?: MatrixDimensions<T>,
) =>
  aggregate(matrix, axes, (a, b) => broadcast(a, b, Math.max))

// Takes all matrix axes and aggregate all matrix elements by default.
const aggregate = <
  T1 extends Matrix,
  T2 extends MatrixDimensions<T1>,
  T3 extends NLevelNestedMatrix<T1, T2>,
>(
  matrix: T1,
  axes = arange(ndim(matrix)) as T2,
  operator: math.BinaryOperator,
): T3 =>
  isMatrixN(matrix) && len(axes) ?
    aggregate(
      aggregateNesting(matrix, first(axes), operator),
      reduceAxes(axes),
      operator,
    ) as T3 :
    matrix as unknown as T3

const aggregateNesting = (matrix: MatrixN, axis: number, operator: math.BinaryOperator): Matrix => {
  if (axis && ndim(matrix) > 1) {
    return matrix.map((x) => aggregateNesting(matrixn(x), axis - 1, operator))
  }
  return matrix.reduce(operator)
}

const reduceAxes = ([axis, ...axes]: VectorN): VectorN => axes.map((x) => x > axis ? x - 1 : x)
