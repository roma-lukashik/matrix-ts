import { BinaryOperator, nonzero } from '../../utils/math'
import { empty, first } from '../../utils/array'
import { Matrix, Matrix0, MatrixDimensions, MatrixN, NLevelNestedMatrix, VectorN } from '../utils/types'
import { arange } from '../creation'
import { isMatrix0, matrixn, ndim } from '../geometry'
import { add, broadcast, multiply } from '../binary-operation'

type AggregateMatrixOperator = {
  <T extends Matrix>(matrix: T): Matrix0;
  <T extends Matrix, K extends MatrixDimensions<T>>(matrix: T, axes: K): NLevelNestedMatrix<T, K>;
}

export const sum: AggregateMatrixOperator = <T extends Matrix>(
  matrix: T,
  axes?: MatrixDimensions<T>,
) =>
  aggregate(matrix, axes, add)

export const prod: AggregateMatrixOperator = <T extends Matrix>(
  matrix: T,
  axes?: MatrixDimensions<T>,
) =>
  aggregate(matrix, axes, multiply)

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
  operator: BinaryOperator,
): T3 => {
  if (isMatrix0(matrix) || empty(axes)) {
    return matrix as unknown as T3
  }
  return aggregate(
    aggregateNesting(matrix, first(axes), operator),
    reduceAxes(axes),
    operator,
  ) as T3
}

const aggregateNesting = (matrix: MatrixN, axis: number, operator: BinaryOperator): Matrix =>
  nonzero(axis) && ndim(matrix) > 1 ?
    matrix.map((x) => aggregateNesting(matrixn(x), axis - 1, operator)) :
    matrix.reduce(operator)

const reduceAxes = ([axis, ...axes]: VectorN): VectorN => axes.map((x) => x > axis ? x - 1 : x)
