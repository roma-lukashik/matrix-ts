import { AggregateMatrixOperator } from './common'
import { Matrix, MatrixAxes } from '../types'
import { reshape, shape } from '../geometry'
import { ones } from '../creation/ones'
import { isNdim } from '../core/isndim'
import { ndim } from '../core/ndim'

export type KeepdimAggregateMatrixOperator = <
  T extends Matrix,
>(matrix: T, ...axes: MatrixAxes<T>) => T

export const keepdim = (fn: AggregateMatrixOperator): KeepdimAggregateMatrixOperator => (matrix, ...axes) =>
  _keepdim(fn(matrix, ...axes), matrix, axes)

const _keepdim = <T extends Matrix>(matrix: Matrix, original: T, axes: number[]): T =>
  isNdim(matrix) ?
    reshape(matrix, shape(original).map((x, i) => axes.includes(i) ? 1 : x)) as T :
    reshape(matrix, ones(ndim(original))) as T
