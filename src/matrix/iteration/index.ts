import { isMatrixN } from '../geometry'
import { Matrix, Matrix2Vector, MatrixN } from '../utils/types'

export const neach = <
  T1 extends MatrixN,
>(matrix: T1, callback: (x: number, ...dn: Matrix2Vector<T1>) => void): void =>
  _neach(matrix, callback)

const _neach = <
  T1 extends MatrixN,
  T2 extends Matrix2Vector<T1>
>(matrix: T1, callback: (x: number, ...dn: T2) => void, dn: number[] = []): void =>
  matrix.forEach((x, i) => isMatrixN(x) ? _neach(x, callback, [...dn, i]) : callback(x, ...[...dn, i] as T2))

// TODO
export const nmap = <
  T extends Matrix
>(matrix: T, callback: (x: number, ...dn: number[]) => number): T =>
  isMatrixN(matrix) ? _nmap(matrix, callback) : callback(matrix) as T

const _nmap= <
  T1 extends MatrixN,
  T2 extends Matrix2Vector<T1>
>(matrix: T1, callback: (x: number, ...dn: T2) => number, dn: number[] = []): T1 =>
  matrix.map((x, i) => isMatrixN(x) ? _nmap(x, callback, [...dn, i]) : callback(x, ...[...dn, i] as T2)) as T1
