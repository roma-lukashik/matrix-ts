import { Matrix1, MatrixN, NestedMatrices, NestedMatrix } from '../types'
import { at } from '../core/at'
import { newaxis } from '../geometry/newaxis'
import { error } from '../utils/function'
import { zip } from '../utils/array'
import { is1dim } from '../core/is1dim'
import { matrix1 } from '../core/matrix1'
import { is2dim } from '../core/is2dim'
import { matrixn } from '../core/matrixn'
import { shape } from '../geometry/shape'
import { matmul2x2 } from './matmul2x2'

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
