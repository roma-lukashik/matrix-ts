import { Matrix, NestedMatrices } from './types'
import * as math from '../../utils/math'
import { isMatrix0, len, matrixn, ndim } from '../geometry'
import { first, zip } from '../../utils/array'
import { error } from '../../utils/function'

export const broadcast = <
  T1 extends Matrix,
  T2 extends Matrix,
  T3 extends T2 extends NestedMatrices<T1> ? T1 : T2
>(a: T1, b: T2, operator: math.BinaryOperator): T3 => {
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

const broadcastNesting = <T extends Matrix>(a: Matrix, b: Matrix, operator: math.BinaryOperator): T =>
  matrixn(a).map((x) => broadcast(x, b, operator)) as T
