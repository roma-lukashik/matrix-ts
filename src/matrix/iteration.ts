import { isMatrixN } from './geometry'
import { Matrix2Vector, MatrixN } from './types'

export const neach = <
  T1 extends MatrixN,
>(matrix: T1, callback: (x: number, ...dn: Matrix2Vector<T1>) => void): void =>
  _neach(matrix, callback)

const _neach = <
  T1 extends MatrixN,
  T2 extends Matrix2Vector<T1>
>(matrix: T1, callback: (x: number, ...dn: T2) => void, dn: number[] = []): void =>
  matrix.forEach((x, i) => isMatrixN(x) ? _neach(x, callback, [...dn, i]) : callback(x, ...[...dn, i] as T2))
