import { identity } from '../utils/function'
import { array, reverse, zip } from '../utils/array'

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

export const zeros = <T extends number[]>(...dn: T) => create(identity(0), ...dn)

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
  matrix.length,
  ...(isMatrix(matrix[0]) ? shape(matrix[0]) : []),
] as S

export const divide = <T extends MatrixN>(matrix: T, scalar: number): T =>
  matrix.map((x) => isMatrix(x) ? divide(x, scalar) : x / scalar) as T

export const multiply = <
  T1 extends MatrixN,
  T2 extends MatrixN,
  T3 extends MatrixN,
>(matrix1: T1, matrix2: T2): T3 => {
  const shape1 = shape(matrix1)
  const shape2 = shape(matrix2)

  if (!shapeCompatible(shape1, shape2)) {
    throw new Error('Matrix could not be broadcast together.')
  }

}

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

const isMatrix = (value: MatrixN | number): value is MatrixN => Array.isArray(value)

/**
 * To make sure two matrix are compatible their dimensions should be compared.
 * Comparing starts with the trailing (i.e. rightmost) dimensions and works its way left.
 * Two dimensions are compatible when:
 * 1. they are equal
 * 2. one of them is 1
*/
const shapeCompatible = <T1 extends VectorN, T2 extends VectorN>(shape1: T1, shape2: T2): boolean =>
  zip(reverse(shape1), reverse(shape2)).every(([a, b]) => a === b || a === 1 || b === 1)
