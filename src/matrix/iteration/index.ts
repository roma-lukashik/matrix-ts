import { isMatrixN } from '../geometry'
import { Matrix, Matrix0, Matrix2Vector, MatrixN } from '../utils/types'

export const neach = <
  T extends MatrixN,
>(matrix: T, callback: (x: Matrix0, ...dn: Matrix2Vector<T>) => void): void =>
  _neach(matrix, callback)

const _neach = (matrix: MatrixN, callback: (x: Matrix0, ...dn: number[]) => void, ...dn: number[]): void =>
  matrix.forEach((x, i) => isMatrixN(x) ? _neach(x, callback, ...dn, i) : callback(x, ...dn, i))

export const nmap = <
  T extends Matrix
>(matrix: T, callback: (x: Matrix0, ...dn: Matrix2Vector<T>) => Matrix0): T =>
  isMatrixN(matrix) ? _nmap(matrix, callback) : callback(matrix, ...[] as Matrix2Vector<T>) as T

const _nmap= <
  T1 extends MatrixN
>(matrix: T1, callback: (x: Matrix0, ...dn: number[]) => Matrix0, ...dn: number[]): T1 =>
  matrix.map((x, i) => isMatrixN(x) ? _nmap(x, callback, ...dn, i) : callback(x, ...dn, i)) as T1
