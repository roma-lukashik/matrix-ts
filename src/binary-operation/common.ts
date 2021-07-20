import { Matrix, NestedMatrices } from '../types'
import {BinaryOperator } from '../utils/math'
import { broadcast } from './broadcast'

type MatrixBinaryOperator = <
  T1 extends Matrix,
  T2 extends Matrix
>(a: T1, b: T2) => T2 extends NestedMatrices<T1> ? T1 : T2

export const operator = (fn: BinaryOperator): MatrixBinaryOperator =>
  (matrix1, matrix2) => broadcast(matrix1, matrix2, fn)
