import { ArrayN } from '../utils/array'

export type Matrix0 = number
export type Matrix1 = number[]
export type Matrix2 = number[][]
export type Matrix3 = number[][][]
export type Matrix4 = number[][][][]
export type MatrixN = ArrayN<Matrix0>
export type Matrix = Matrix0 | MatrixN
export type MeasurableMatrix = Matrix1 | Matrix2 | Matrix3 | Matrix4

export type Vector1 = [number]
export type Vector2 = [number, number]
export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]
export type VectorN = number[]
export type Vector = Vector1 | Vector2 | Vector3 | Vector4 | VectorN

export type NestedMatrix<T extends Matrix> = T extends MatrixN ? T[0] : Matrix0

export type NestedMatrices<T extends Matrix> =
  T extends Matrix0 ? never :
  T extends MeasurableMatrix ? T[0] | NestedMatrices<T[0]> : T

export type MatrixSize<T extends Matrix> =
  T extends Matrix0 ? [] :
  T extends MeasurableMatrix ? [number, ...MatrixSize<NestedMatrix<T>>] : number[]

export type MatrixAxes<T extends Matrix> =
  T extends Matrix0 ? never :
  T extends MeasurableMatrix ? MatrixSize<T> | MatrixAxes<NestedMatrix<T>> : MatrixSize<T>

export type SubMatrix<
  T extends Matrix,
  K extends VectorN,
> =
  K extends [] ? Matrix0 :
  K extends Vector1 ? NestedMatrix<T> :
  K extends Vector2 ? NestedMatrix<NestedMatrix<T>> :
  K extends Vector3 ? NestedMatrix<NestedMatrix<NestedMatrix<T>>> :
  K extends Vector4 ? NestedMatrix<NestedMatrix<NestedMatrix<NestedMatrix<T>>>> :
  MatrixN

export type Size2Matrix<T extends number[]> =
  T extends [number, ...infer Tail] ? Tail extends number[] ? Array<Size2Matrix<Tail>> : never :
  T extends [] ? Matrix0 : MatrixN
