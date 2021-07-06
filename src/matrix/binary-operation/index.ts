import { Matrix, NestedMatrices } from '../utils/types'
import * as math from '../../utils/math'
import { BinaryOperator } from '../../utils/math'
import { isMatrix0, len, matrixn, ndim } from '../geometry'
import { first, zip } from '../../utils/array'
import { error } from '../../utils/function'

type MatrixBinaryOperator = <
  T1 extends Matrix,
  T2 extends Matrix
>(a: T1, b: T2) => T2 extends NestedMatrices<T1> ? T1 : T2

export const add: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.add)

export const subtract: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.subtract)

export const multiply: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.multiply)

export const divide: MatrixBinaryOperator = (matrix1, matrix2) =>
  broadcast(matrix1, matrix2, math.divide)

export const broadcast = <
  T1 extends Matrix,
  T2 extends Matrix,
  T3 extends T2 extends NestedMatrices<T1> ? T1 : T2
>(a: T1, b: T2, operator: BinaryOperator): T3 => {
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

const broadcastNesting = <T extends Matrix>(a: Matrix, b: Matrix, operator: BinaryOperator): T =>
  matrixn(a).map((x) => broadcast(x, b, operator)) as T
