import { isNdim } from '../core/isndim'
import { Matrix, Matrix0, MatrixN } from '../types'
import { Fn } from './types'

export const nmap = <T extends Matrix>(matrix: T, fn: Fn<T, Matrix0>): T =>
  isNdim(matrix) ? _nmap(matrix, fn) as T : fn(matrix) as T

const _nmap = (matrix: MatrixN, fn: Fn<MatrixN, Matrix0>, ...dn: number[]): MatrixN =>
  matrix.map((x, i) => isNdim(x) ? _nmap(x, fn, ...dn, i) : fn(x, ...dn, i))
