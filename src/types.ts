import { ArrayN } from './utils/array'

export type Matrix0 = number
export type Matrix1 = number[]
export type Matrix2 = number[][]
export type Matrix3 = number[][][]
export type Matrix4 = number[][][][]
export type MatrixN = ArrayN<Matrix0>
export type Matrix = Matrix0 | MatrixN
export type MeasurableMatrix = Matrix1 | Matrix2 | Matrix3 | Matrix4

type MeasurableVector = [number, ...number[]]
export type Vector = MeasurableVector | number[]

export type NestedMatrix<T extends Matrix> = T extends MatrixN ? T[0] : Matrix0

export type NestedMatrices<T extends Matrix> =
  T extends Matrix0 ? T :
  T extends MeasurableMatrix ? T[0] | NestedMatrices<T[0]> : T

export type MatrixSize<T extends Matrix> =
  T extends Matrix0 ? [] :
  T extends MeasurableMatrix ? [number, ...MatrixSize<NestedMatrix<T>>] : number[]

export type MatrixAxes<T extends Matrix> =
  T extends Matrix0 ? never :
  T extends MeasurableMatrix ? MatrixSize<T> | MatrixAxes<NestedMatrix<T>> | [] : number[]

export type SubMatrix<
  T extends Matrix,
  K extends Vector,
> =
  K extends [] ? Matrix0 :
  K extends [number] ? NestedMatrix<T> :
  K extends [number, number] ? NestedMatrix<NestedMatrix<T>> :
  K extends [number, number, number] ? NestedMatrix<NestedMatrix<NestedMatrix<T>>> :
  K extends [number, number, number, number] ? NestedMatrix<NestedMatrix<NestedMatrix<NestedMatrix<T>>>> : MatrixN

export type Size2Matrix<T extends number[]> =
  T extends [] ? Matrix0 :
  T extends MeasurableVector ? Array<Size2Matrix<Tail<T>>> : MatrixN

type Tail<T extends number[]> = T extends [number, ...infer K] ? K extends number[] ? K : never : never

