import { identity } from '../utils/function'
import { array, zip } from '../utils/array'
import * as math from '../utils/math'

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
  T1 extends MatrixN | number,
  T2 extends MatrixN | number,
  T3 extends (
    T1 extends MatrixN ? MatrixN :
    T2 extends MatrixN ? MatrixN :
    number
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
  ...(isMatrix(matrix[0]) ? shape(matrix[0]) : []),
] as S

export const multiply: MatrixBinaryOperator = (matrix1, matrix2) => broadcast(matrix1, matrix2, math.multiply)

export const divide: MatrixBinaryOperator = (matrix1, matrix2) => broadcast(matrix1, matrix2, math.divide)

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
  d0 ? matrix.slice(d0[0], d0[1]).map((item) => isMatrix(item) ? sample(item, ...rest) : item) as T : matrix

const size = (matrix: MatrixN | number): number => isMatrix(matrix) ? matrix.length : 0

const isMatrix = (value: MatrixN | number): value is MatrixN => Array.isArray(value)

const isScalar = (value: MatrixN | number): value is number => !isMatrix(value)

// Needs refactoring.
const broadcast = <
  T1 extends MatrixN | number,
  T2 extends MatrixN | number,
  T3 extends (
    T1 extends MatrixN ? MatrixN :
    T2 extends MatrixN ? MatrixN :
    number
  )
>(matrix1: T1, matrix2: T2, callback: math.BinaryOperator): T3 => {
  if (isScalar(matrix1) && isScalar(matrix2)) {
    return callback(matrix1, matrix2) as T3
  }
  if (isScalar(matrix1) && isMatrix(matrix2)) {
    return matrix2.map((m2) => broadcast(matrix1, m2, callback)) as T3
  }
  if (isMatrix(matrix1) && isScalar(matrix2)) {
    return matrix1.map((m1) => broadcast(m1, matrix2, callback)) as T3
  }
  const a = matrix1 as MatrixN
  const b = matrix2 as MatrixN
  if (size(shape(a)) < size(shape(b))) {
    return b.map((m2) => broadcast(a, m2, callback)) as T3
  }
  if (size(shape(a)) > size(shape(b))) {
    return a.map((m1) => broadcast(m1, b, callback)) as T3
  }
  if (size(a) === size(b)) {
    return zip(a, b).map(([a, b]) => broadcast(a, b, callback)) as T3
  }
  if (size(a) === 1) {
    return broadcast(array(size(b), identity(a[0])), b, callback) as T3
  }
  if (size(b) === 1) {
    return broadcast(a, array(size(a), identity(b[0])), callback) as T3
  }

  throw new Error('Matrix could not be broadcast together.')
}
