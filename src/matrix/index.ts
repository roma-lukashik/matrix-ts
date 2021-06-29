import { constant, error, identity, isDefined } from '../utils/function'
import { array, ArrayN, first, size, zip } from '../utils/array'
import * as math from '../utils/math'
import { rand } from '../utils/random'

export type Matrix0 = number
export type Matrix1 = Matrix0[]
export type Matrix2 = Matrix1[]
export type Matrix3 = Matrix2[]
export type Matrix4 = Matrix3[]
export type MatrixN = ArrayN<Matrix0>
export type Matrix = Matrix0 | MatrixN

type Vector1 = [number]
type Vector2 = [number, number]
type Vector3 = [number, number, number]
type Vector4 = [number, number, number, number]
type VectorN = number[]

type NestedMatrix<T extends Matrix> = T extends MatrixN ? T[0] : Matrix0

type NestedMatrices<T extends Matrix> =
  T extends Matrix1 | Matrix2 | Matrix3 | Matrix4 ? T[0] | NestedMatrices<T[0]> : T

type NestedVectors<T extends VectorN> =
  T extends [...infer Head, number] ?
    Head extends Vector2 | Vector3 | Vector4 ? Head | NestedVectors<Head> :
    Head extends [] ? never : Head : T

type MatrixDimensions<T extends Matrix, K extends VectorN = Matrix2Vector<T>> =
  K | (K extends Vector1 | Vector2 | Vector3 | Vector4 ? NestedVectors<K> : NestedVectors<Vector4>)

type NLevelNestedMatrix<
  T extends Matrix,
  K extends MatrixDimensions<T>,
> =
  K extends Vector1 ? NestedMatrix<T> :
  K extends Vector2 ? NestedMatrix<NestedMatrix<T>> :
  K extends Vector3 ? NestedMatrix<NestedMatrix<NestedMatrix<T>>> :
  K extends Vector4 ? NestedMatrix<NestedMatrix<NestedMatrix<NestedMatrix<T>>>> :
  MatrixN

type MatrixBinaryOperator = <
  T1 extends Matrix,
  T2 extends Matrix
>(a: T1, b: T2) => T2 extends NestedMatrices<T1> ? T1 : T2

type AggregateMatrixOperator = {
  <T extends Matrix>(matrix: T): Matrix0;
  <T extends Matrix, K extends MatrixDimensions<T>>(matrix: T, axes: K): NLevelNestedMatrix<T, K>;
}

type Vector2Matrix<T extends VectorN> =
  T extends Vector1 ? Matrix1 :
  T extends Vector2 ? Matrix2 :
  T extends Vector3 ? Matrix3 :
  T extends Vector4 ? Matrix4 :
  MatrixN

type Matrix2Vector<T extends Matrix> =
  T extends Matrix0 ? never :
  T extends Matrix1 ? Vector1 :
  T extends Matrix2 ? Vector2 :
  T extends Matrix3 ? Vector3 :
  T extends Matrix4 ? Vector4 :
  VectorN

export const create = <T extends VectorN, U extends Vector2Matrix<T>>(fill: () => number, ...[d0, ...dn]: T): U =>
  array(d0, () => len(dn) ? create(fill, ...dn): fill()) as U

export const zeros = <T extends VectorN>(...dn: T) => create(constant(0), ...dn)

export const arange = (dn: number): Matrix1 => array(dn, identity)

// Return samples from the "standard normal" distribution.
export const randn = <T extends VectorN>(...dn: T) => create(rand, ...dn)

export const exp = <T extends Matrix>(matrix: T): T =>
  isMatrixN(matrix) ? matrix.map(exp) as T : Math.exp(matrix) as T

export const shape = <T extends MatrixN, U extends Matrix2Vector<T>>(matrix: T): U => [
  len(matrix),
  ...(isMatrixN(first(matrix)) ? shape(matrixn(first(matrix))) : []),
] as U

export const at = <
  T1 extends MatrixN,
  T2 extends MatrixDimensions<T1>,
  T3 extends NLevelNestedMatrix<T1, T2>
>(matrix: T1, ...[d0, ...dn]: T2): T3 => {
  const i = d0 < 0 ? len(matrix) + d0 : d0
  if (!isDefined(matrix[i])) {
    return error(`Index ${i} out of bounds [0, ${len(matrix) - 1}].`)
  }
  return (len(dn) > 0 ? at(matrixn(matrix[i]), ...dn) : matrix[i]) as T3
}

export const neach = <
  T1 extends MatrixN,
>(matrix: T1, callback: (x: number, ...dn: Matrix2Vector<T1>) => void): void =>
  _neach(matrix, callback)

export const _neach = <
  T1 extends MatrixN,
  T2 extends Matrix2Vector<T1>
>(matrix: T1, callback: (x: number, ...dn: T2) => void, dn: number[] = []): void =>
  matrix.forEach((x, i) => isMatrixN(x) ? _neach(x, callback, [...dn, i]) : callback(x, ...[...dn, i] as T2))

export const partition = <
  T extends Matrix,
  U extends (
    T extends Matrix0 ? [] :
    T extends Matrix1 ? [Vector2] :
    T extends Matrix2 ? [Vector2, Vector2] :
    T extends Matrix3 ? [Vector2, Vector2, Vector2] :
    T extends Matrix4 ? [Vector2, Vector2, Vector2, Vector2] :
    Vector2[]
  )
>(matrix: T, ...[d0, ...rest]: U): T =>
  d0 && isMatrixN(matrix) ? matrix.slice(...d0).map((x) => partition(x, ...rest)) as T : matrix

export const newaxis = <T1 extends Matrix>(matrix: T1, axis: number): T1[] =>
  axis === 0 || !isMatrixN(matrix) ? [matrix] : matrix.map((x) => newaxis(x, axis - 1)) as T1[]

export const add: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.add)

export const subtract: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.subtract)

export const multiply: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.multiply)

export const divide: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.divide)

export const sum: AggregateMatrixOperator = <T extends Matrix>(
  matrix: T,
  axes?: MatrixDimensions<T>,
) =>
  aggregate(matrix, axes, add)

export const max: AggregateMatrixOperator = <T extends Matrix>(
  matrix: T,
  axes?: MatrixDimensions<T>,
) =>
  aggregate(matrix, axes, (a, b) => broadcast(a, b, Math.max))

export const dot = (a: Matrix, b: Matrix): Matrix => {
  if (isMatrix0(a) || isMatrix0(b)) {
    return multiply(a, b)
  }
  if (isMatrix1(a) && isMatrix1(b)) {
    return sum(multiply(a, b))
  }
  if (isMatrix2(a) && isMatrix2(b)) {
    return matmul2x2(a, b)
  }
  if (isMatrix1(b)) {
    return a.map((x) => dot(x, b))
  }
  if (isMatrix1(a) && isMatrix2(b)) {
    return matmul(a, b)
  }
  if (isMatrix1(a)) {
    return b.map((y) => dot(a, y))
  }
  if (at(shape(a), -1) === at(shape(b), -2)) {
    return a.map((x) => dot(x, b))
  }
  return error(`Shapes (${shape(a)}) and (${shape(b)}) are not aligned.`)
}

export const matmul = (a: MatrixN, b: MatrixN): MatrixN => {
  if (isMatrix1(a)) {
    return matmul(newaxis(a, 0), b).flat()
  }
  if (isMatrix1(b)) {
    return matmul(a, newaxis(b, 1)).flat()
  }
  if (isMatrix2(a) && isMatrix2(b)) {
    return matmul2x2(a, b)
  }
  if (isMatrix2(a)) {
    return b.map((y) => matmul(a, matrixn(y)))
  }
  if (isMatrix2(b)) {
    return a.map((x) => matmul(matrixn(x), b))
  }
  if (at(shape(matrixn(a)), -1) === at(shape(matrixn(b)), -2)) {
    return zip(a, b).map(([x, y]) => matmul(matrixn(x), matrixn(y)))
  }
  return error(`Shapes (${shape(matrixn(a))}) and (${shape(matrixn(b))}) are not aligned.`)
}

const matmul2x2 = (a: Matrix2, b: Matrix2): Matrix2 => {
  if (len(first(a)) !== len(b)) {
    return error('Input operand does not have enough dimensions.')
  }
  const columns = arange(len(first(b)))
  return a.map((row) =>
    columns.map((j) => row.reduce((sum, x, i) => sum + x * at(b, i, j), 0))
  )
}

// Number of rows.
const len = (matrix: Matrix): number => isMatrixN(matrix) ? size(matrix) : 0

// Number of dimensions.
const ndim = (matrix: Matrix): number => isMatrixN(matrix) ? size(shape(matrix)) : 0

export const matrix0 = (value: Matrix): Matrix0 =>
  isMatrixN(value) ? error(`Value is not an instance of Matrix0`) : value

// Typesafe casting value to MatrixN.
export const matrixn = <T extends MatrixN>(value: Matrix0 | T): T =>
  isMatrixN(value) ? value : error(`Value ${value} is not an instance of MatrixN`)

const isMatrix0 = (matrix: Matrix): matrix is Matrix0 => len(matrix) === 0

const isMatrix1 = (matrix: Matrix): matrix is Matrix1 => ndim(matrix) === 1

const isMatrix2 = (matrix: Matrix): matrix is Matrix2 => ndim(matrix) === 2

const isMatrixN = <T extends MatrixN>(matrix: Matrix0 | T): matrix is T => Array.isArray(matrix)

const broadcast = <
  T1 extends Matrix,
  T2 extends Matrix,
  T3 extends T2 extends NestedMatrices<T1> ? T1 : T2
>(a: T1, b: T2, operator: math.BinaryOperator): T3 => {
  if (isMatrix0(a) && isMatrix0(b)) {
    return operator(a, b) as T3
  }
  if (ndim(a) < ndim(b)) {
    return broadcastNesting(b, a, operator)
  }
  if (ndim(a) > ndim(b)) {
    return broadcastNesting(a, b, operator)
  }
  if (len(a) === len(b)) {
    return zip(matrixn(a), matrixn(b)).map(([x, y]) => broadcast(x, y, operator)) as T3
  }
  if (len(a) === 1) {
    return broadcastNesting(b, first(matrixn(a)), operator)
  }
  if (len(b) === 1) {
    return broadcastNesting(a, first(matrixn(b)), operator)
  }
  return error('Matrix could not be broadcast together.')
}

const broadcastNesting = <T extends Matrix>(a: Matrix, b: Matrix, operator: math.BinaryOperator): T =>
  matrixn(a).map((x) => broadcast(x, b, operator)) as T

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
