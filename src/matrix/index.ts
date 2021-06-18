import { constant, error, identity, isDefined } from '../utils/function'
import { array, ArrayN, first, zip } from '../utils/array'
import * as math from '../utils/math'

export type Matrix0 = number
export type Matrix1 = Matrix0[]
export type Matrix2 = Matrix1[]
export type Matrix3 = Matrix2[]
export type Matrix4 = Matrix3[]
export type MatrixN = ArrayN<Matrix0>
export type Matrix = Matrix0 | MatrixN

export type Vector1 = [number]
export type Vector2 = [number, number]
export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]
export type VectorN = number[]

type SmallerMatrices<T extends Matrix> =
  T extends Matrix1 | Matrix2 | Matrix3 | Matrix4 ? T[0] | SmallerMatrices<T[0]> : T

type MatrixBinaryOperator = <
  T1 extends Matrix,
  T2 extends Matrix
>(a: T1, b: T2) => T2 extends SmallerMatrices<T1> ? T1 : T2

type AggregateMatrixOperator = (matrix: Matrix, axes?: VectorN) => Matrix

export const create = <
  T extends VectorN,
  R extends (
    T extends Vector1 ? Matrix1 :
    T extends Vector2 ? Matrix2 :
    T extends Vector3 ? Matrix3 :
    T extends Vector4 ? Matrix4 :
    MatrixN
  )
>(fill: () => number, ...[d0, ...dn]: T): R =>
  array(d0, () => dn.length ? create(fill, ...dn): fill()) as R

export const zeros = <T extends VectorN>(...dn: T) => create(constant(0), ...dn)

export const shape = <
  T extends MatrixN,
  S extends (
    T extends Matrix1 ? Vector1 :
    T extends Matrix2 ? Vector2 :
    T extends Matrix3 ? Vector3 :
    T extends Matrix4 ? Vector4 :
    VectorN
  )
>(matrix: T): S => [
  len(matrix),
  ...(isMatrixN(first(matrix)) ? shape(matrixN(first(matrix))) : []),
] as S

export const partition = <
  T extends Matrix,
  S extends (
    T extends Matrix0 ? [] :
    T extends Matrix1 ? [Vector2] :
    T extends Matrix2 ? [Vector2, Vector2] :
    T extends Matrix3 ? [Vector2, Vector2, Vector2] :
    T extends Matrix4 ? [Vector2, Vector2, Vector2, Vector2] :
    Vector2[]
  )
>(matrix: T, ...[d0, ...rest]: S): T =>
  d0 && isMatrixN(matrix) ? matrix.slice(...d0).map((item) => partition(item, ...rest)) as T : matrix

export const add: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.add)

export const multiply: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.multiply)

export const divide: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.divide)

export const sum: AggregateMatrixOperator = (matrix, axes) =>
  aggregate(matrix, axes, add)

export const max: AggregateMatrixOperator = (matrix, axes) =>
  aggregate(matrix, axes, (m1, m2) => broadcast(m1, m2, Math.max))

export const dot = (a: Matrix, b: Matrix): Matrix => {
  if (len(a) === 0 || len(b) === 0) {
    return multiply(a, b)
  }
  if (isMatrix1(a) && isMatrix1(b)) {
    return zip(a, b).reduce((acc, [x, y]) => acc + x * y, 0)
  }
  return multiply(a, b)
}

// Number of rows.
const len = (matrix: Matrix): number => isMatrixN(matrix) ? matrix.length : 0

// Number of dimensions.
const ndim = (matrix: Matrix): number => isMatrixN(matrix) ? shape(matrix).length : 0

// Typesafe casting value to Matrix0.
const matrix0 = (value: Matrix): Matrix0 =>
  isMatrixN(value) ? error(`Value is not an instance of Matrix0`) : value

// Typesafe casting value to MatrixN.
const matrixN = <T extends MatrixN>(value: Matrix0 | T): T =>
  isMatrixN(value) ? value : error(`Value ${value} is not an instance of MatrixN`)

const isMatrix1 = <T extends Matrix1>(matrix: T | Matrix): matrix is T => ndim(matrix) === 1
const isMatrixN = <T extends MatrixN>(matrix: Matrix0 | T): matrix is T => Array.isArray(matrix)

const broadcast = <
  T1 extends Matrix,
  T2 extends Matrix,
  T3 extends T2 extends SmallerMatrices<T1> ? T1 : T2
>(a: T1, b: T2, operator: math.BinaryOperator): T3 => {
  if (len(a) === 0 && len(b) === 0) {
    return operator(matrix0(a), matrix0(b)) as T3
  }
  if (ndim(a) < ndim(b)) {
    return broadcastNesting(b, a, operator) as unknown as T3
  }
  if (ndim(a) > ndim(b)) {
    return broadcastNesting(a, b, operator) as unknown as T3
  }
  if (len(a) === len(b)) {
    return zip(matrixN(a), matrixN(b)).map(([x, y]) => broadcast(x, y, operator)) as T3
  }
  if (len(a) === 1) {
    return broadcastNesting(b, first(matrixN(a)), operator) as T3
  }
  if (len(b) === 1) {
    return broadcastNesting(a, first(matrixN(b)), operator) as T3
  }

  return error('Matrix could not be broadcast together.')
}

const broadcastNesting = <
  T1 extends Matrix,
  T2 extends Matrix,
>(a: T1, b: T2, operator: math.BinaryOperator) =>
  matrixN(a).map((x) => broadcast(x, b, operator))

// Takes all matrix axes and aggregate all matrix elements by default.
const aggregate = (
  matrix: Matrix,
  [axis, ...restAxes] = array(ndim(matrix), identity),
  operator: math.BinaryOperator,
): Matrix =>
  isMatrixN(matrix) && isDefined(axis)
    ? aggregate(aggregateNesting(matrix, axis, operator), reduceAxes(restAxes, axis), operator)
    : matrix

const aggregateNesting = (matrix: MatrixN, axis: number, operator: math.BinaryOperator): Matrix =>
  axis && ndim(matrix) > 1
    ? matrix.map((x) => aggregateNesting(matrixN(x), axis - 1, operator))
    : matrix.reduce(operator)

const reduceAxes = <T extends VectorN>(axes: T, axis: number): T =>
  axes.map((x) => x > axis ? x - 1 : x) as T
