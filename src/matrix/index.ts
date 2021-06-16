import { error, identity } from '../utils/function'
import { array, zip } from '../utils/array'
import * as math from '../utils/math'

export type Matrix0 = number
export type Matrix1 = number[]
export type Matrix2 = number[][]
export type Matrix3 = number[][][]
export type Matrix4 = number[][][][]
export type MatrixN = Array<MatrixN | number>

export type Vector1 = [number]
export type Vector2 = [number, number]
export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]
export type VectorN = number[]

type MatrixBinaryOperator = <
  T1 extends Matrix0 | MatrixN,
  T2 extends Matrix0 | MatrixN,
  T3 extends (
    T1 extends MatrixN ? MatrixN :
    T2 extends MatrixN ? MatrixN :
    Matrix0
  )
>(a: T1, b: T2) => T3

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

export const zeros = <T extends VectorN>(...dn: T) => create(identity(0), ...dn)

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
  size(matrix),
  ...(isMatrixN(matrix[0]) ? shape(matrix[0]) : []),
] as S

export const multiply: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.multiply)

export const divide: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.divide)

export const sample = <
  T extends MatrixN,
  S extends (
    T extends Matrix1 ? [Vector2] :
    T extends Matrix2 ? [Vector2, Vector2] :
    T extends Matrix3 ? [Vector2, Vector2, Vector2] :
    T extends Matrix4 ? [Vector2, Vector2, Vector2, Vector2] :
    Vector2[]
  )
>(matrix: T, ...[d0, ...rest]: S): T =>
  d0 ? matrix.slice(d0[0], d0[1]).map((item) => isMatrixN(item) ? sample(item, ...rest) : item) as T : matrix

const size = (matrix: Matrix0 | MatrixN): number => isMatrixN(matrix) ? matrix.length : 0

const ndim = (matrix: Matrix0 | MatrixN): number => isMatrixN(matrix) ? shape(matrix).length : 0

const isMatrixN = <T extends MatrixN>(matrix: Matrix0 | T): matrix is T => Array.isArray(matrix)

const isMatrix0 = (matrix: Matrix0 | MatrixN): matrix is Matrix0 => !isMatrixN(matrix)

const toMatrixN = <T extends MatrixN>(value: Matrix0 | T): T =>
  isMatrixN(value) ? value : error(`Value ${value} is not an instance of MatrixN`)

// Needs refactoring.
const broadcast = <
  T1 extends MatrixN | Matrix0,
  T2 extends MatrixN | Matrix0,
  T3 extends (
    T1 extends MatrixN ? MatrixN :
    T2 extends MatrixN ? MatrixN :
    Matrix0
  )
>(a: T1, b: T2, callback: math.BinaryOperator): T3 => {
  if (isMatrix0(a) && isMatrix0(b)) {
    return callback(a, b) as T3
  }
  if (ndim(a) < ndim(b)) {
    return toMatrixN(b).map((x) => broadcast(a, x, callback)) as T3
  }
  if (ndim(a) > ndim(b)) {
    return toMatrixN(a).map((x) => broadcast(x, b, callback)) as T3
  }
  if (size(a) === size(b)) {
    return zip(toMatrixN(a), toMatrixN(b)).map(([x, y]) => broadcast(x, y, callback)) as T3
  }
  if (size(a) === 1) {
    return broadcast(array(size(b), identity(toMatrixN(a)[0])), b, callback) as T3
  }
  if (size(b) === 1) {
    return broadcast(a, array(size(a), identity(toMatrixN(b)[0])), callback) as T3
  }

  return error('Matrix could not be broadcast together.')
}
