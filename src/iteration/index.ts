import { isMatrixN } from '../geometry'
import { Matrix, Matrix0, MatrixSize, MatrixN } from '../types'

type Fn<T extends Matrix, U> = T extends Matrix0 ? {
  (x: Matrix0): U;
} : {
  (x: Matrix0, ...dn: MatrixSize<T>): U;
}

export const neach = <T extends Matrix>(matrix: T, fn: Fn<T, void>): void =>
  isMatrixN(matrix) ? _neach(matrix, fn) : fn(matrix)

const _neach = (matrix: MatrixN, fn: Fn<MatrixN, void>, ...dn: number[]): void =>
  matrix.forEach((x, i) => isMatrixN(x) ? _neach(x, fn, ...dn, i) : fn(x, ...dn, i))

export const nmap = <T extends Matrix>(matrix: T, fn: Fn<T, Matrix0>): T =>
  isMatrixN(matrix) ? _nmap(matrix, fn) as T : fn(matrix) as T

const _nmap= (matrix: MatrixN, fn: Fn<MatrixN, Matrix0>, ...dn: number[]): MatrixN =>
  matrix.map((x, i) => isMatrixN(x) ? _nmap(x, fn, ...dn, i) : fn(x, ...dn, i))
