import {
  Matrix,
  Matrix0,
  Matrix1,
  Matrix2,
  Matrix3,
  Matrix4,
  MatrixN,
  NestedMatrices,
  NestedMatrix,
} from '../types'
import { at, newaxis } from '../geometry'
import { sum } from '../aggregation/sum'
import { error } from '../utils/function'
import { first, zip } from '../utils/array'
import { arange } from '../creation/arange'
import { multiply } from '../binary-operation/multiply'
import { is0dim } from '../core/is0dim'
import { is1dim } from '../core/is1dim'
import { matrix1 } from '../core/matrix1'
import { is2dim } from '../core/is2dim'
import { matrixn } from '../core/matrixn'
import { len } from '../core/len'
import { shape } from '../geometry/shape'

type DotResult <
  T1 extends Matrix,
  T2 extends Matrix,
> =
  T2 extends Matrix0 ? T1 :
  T2 extends Matrix1 ? NestedMatrix<T1> :
  T1 extends Matrix0 ? T2 :
  T1 extends Matrix1 ? NestedMatrix<T2> :
  T1 extends Matrix2 ? T2 :
  T1 extends Matrix3 ? T2[] :
  T1 extends Matrix4 ? T2[][] :
  MatrixN

export const dot = <
  T1 extends Matrix,
  T2 extends Matrix,
  T3 extends DotResult<T1, T2>
>(a: T1, b: T2): T3 => {
  if (is0dim(a) || is0dim(b)) {
    return multiply(a, b) as unknown as T3
  }
  if (is1dim(a) && is1dim(b)) {
    return sum(matrix1(multiply(a, b))) as T3
  }
  if (is2dim(a) && is2dim(b)) {
    return matmul2x2(a, b) as T3
  }
  if (is1dim(b)) {
    return a.map((x) => dot(x, b)) as T3
  }
  if (is1dim(a) && is2dim(b)) {
    return matmul(a, b) as T3
  }
  if (is1dim(a)) {
    return b.map((y) => dot(a, y)) as T3
  }
  if (at(matrix1(shape(a)), -1) === at(matrix1(shape(b)), -2)) {
    return a.map((x) => dot(x, b)) as T3
  }
  return error(`Shapes (${shape(a)}) and (${shape(b)}) are not aligned.`)
}

type MatmulResult<
  T1 extends MatrixN,
  T2 extends MatrixN
> =
  T1 extends Matrix1 ? NestedMatrix<T2> :
  T2 extends Matrix1 ? NestedMatrix<T1> :
  T2 extends NestedMatrices<T1> ? T1 : T2

export const matmul = <
  T1 extends MatrixN,
  T2 extends MatrixN,
  T3 extends MatmulResult<T1, T2>
>(a: T1, b: T2): T3 => {
  if (is1dim(a)) {
    return matrixn(matmul(newaxis(a, 0), b)).flat() as unknown as T3
  }
  if (is1dim(b)) {
    return matrixn(matmul(a, newaxis(b, 1))).flat() as unknown as T3
  }
  if (is2dim(a) && is2dim(b)) {
    return matmul2x2(a, b) as T3
  }
  if (is2dim(a)) {
    return b.map((y) => matmul(a, matrixn(y))) as unknown as T3
  }
  if (is2dim(b)) {
    return a.map((x) => matmul(matrixn(x), b)) as unknown as T3
  }
  if (at(matrix1(shape(a)), -1) === at(matrix1(shape(b)), -2)) {
    return zip(a, b).map(([x, y]) => matmul(matrixn(x), matrixn(y))) as T3
  }
  return error(`Shapes (${shape(a)}) and (${shape(b)}) are not aligned.`)
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
