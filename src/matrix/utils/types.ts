import { ArrayN } from '../../utils/array'

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
export type Vector = NestedVectors<Vector4> | VectorN

export type Vector2Matrix<T extends VectorN> =
  T extends Vector1 ? Matrix1 :
  T extends Vector2 ? Matrix2 :
  T extends Vector3 ? Matrix3 :
  T extends Vector4 ? Matrix4 :
  MatrixN

export type Matrix2Vector<T extends Matrix> =
  T extends Matrix0 ? never :
  T extends Matrix1 ? Vector1 :
  T extends Matrix2 ? Vector2 :
  T extends Matrix3 ? Vector3 :
  T extends Matrix4 ? Vector4 :
  VectorN

type NestedMatrix<T extends Matrix> = T extends MatrixN ? T[0] : Matrix0

export type NestedMatrices<T extends Matrix> =
  T extends Matrix1 | Matrix2 | Matrix3 | Matrix4 ? T[0] | NestedMatrices<T[0]> : T

export type NLevelNestedMatrix<
  T extends Matrix,
  K extends MatrixDimensions<T>,
> =
  K extends Vector1 ? NestedMatrix<T> :
  K extends Vector2 ? NestedMatrix<NestedMatrix<T>> :
  K extends Vector3 ? NestedMatrix<NestedMatrix<NestedMatrix<T>>> :
  K extends Vector4 ? NestedMatrix<NestedMatrix<NestedMatrix<NestedMatrix<T>>>> :
  MatrixN

export type NestedVectors<T extends VectorN> =
  T extends [...infer Head, number] ?
  Head extends Vector2 | Vector3 | Vector4 ? Head | NestedVectors<Head> :
  Head extends [] ? never : Head : T

export type MatrixDimensions<T extends Matrix, K extends VectorN = Matrix2Vector<T>> =
  K | (K extends Vector1 | Vector2 | Vector3 | Vector4 ? NestedVectors<K> : NestedVectors<Vector4>)
