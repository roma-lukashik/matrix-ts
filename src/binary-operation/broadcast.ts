import { Matrix, NestedMatrices } from '../types'
import { BinaryOperator } from '../utils/math'
import { isMatrix0, len, matrixn, ndim } from '../geometry'
import { first, zip } from '../utils/array'
import { error } from '../utils/function'

/**
 * When operating on two arrays, it compares their shapes element-wise.
 * Two dimensions are compatible when
 * - they are equal, or
 * - one of them is 1.
 * Arrays do not need to have the same number of dimensions.
 */
export const broadcast = <
  T1 extends Matrix,
  T2 extends Matrix,
  T3 extends T2 extends NestedMatrices<T1> ? T1 : T2
>(a: T1, b: T2, operator: BinaryOperator): T3 => {
  if (isMatrix0(a) && isMatrix0(b)) {
    return operator(a, b) as T3
  }
  if (ndim(a) < ndim(b)) {
    return matrixn(b).map((y) => broadcast(a, y, operator)) as unknown as T3
  }
  if (ndim(a) > ndim(b)) {
    return matrixn(a).map((x) => broadcast(x, b, operator)) as unknown as T3
  }
  if (len(a) === len(b)) {
    return zip(matrixn(a), matrixn(b)).map(([x, y]) => broadcast(x, y, operator)) as T3
  }
  if (len(a) === 1) {
    return broadcast(first(matrixn(a)), b, operator) as unknown as T3
  }
  if (len(b) === 1) {
    return broadcast(a, first(matrixn(b)), operator)
  }
  return error('Matrix could not be broadcast together.')
}
