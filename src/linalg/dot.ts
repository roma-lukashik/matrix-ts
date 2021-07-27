import { Matrix, Matrix0, Matrix1, Matrix2, Matrix3, Matrix4, MatrixN, NestedMatrix } from '../types'
import { is0dim } from '../core/is0dim'
import { multiply } from '../binary-operation/multiply'
import { is1dim } from '../core/is1dim'
import { sum } from '../aggregation/sum'
import { matrix1 } from '../core/matrix1'
import { is2dim } from '../core/is2dim'
import { at } from '../core/at'
import { shape } from '../geometry/shape'
import { error } from '../utils/function'
import { matmul } from './matmul'
import { matmul2x2 } from './matmul2x2'

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
  T1 extends Matrix4 ? T2[][] : MatrixN

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
