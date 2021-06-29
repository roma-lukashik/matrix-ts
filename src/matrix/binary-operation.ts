import { Matrix, Matrix2, MatrixN, NestedMatrices } from './types'
import * as math from '../utils/math'
import { first, zip } from '../utils/array'
import { error } from '../utils/function'
import { at, isMatrix0, isMatrix1, isMatrix2, len, matrixn, newaxis, shape } from './geometry'
import { arange } from './creation'
import { broadcast } from './broadcasting'
import { sum } from './aggregation'

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
