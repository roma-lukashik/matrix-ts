import { Matrix, MatrixN } from '../types'
import { isNdim } from '../core/isndim'
import { Fn } from './types'

export const neach = <T extends Matrix>(matrix: T, fn: Fn<T, void>): void =>
  isNdim(matrix) ? _neach(matrix, fn) : fn(matrix)

const _neach = (matrix: MatrixN, fn: Fn<MatrixN, void>, ...dn: number[]): void =>
  matrix.forEach((x, i) => isNdim(x) ? _neach(x, fn, ...dn, i) : fn(x, ...dn, i))
