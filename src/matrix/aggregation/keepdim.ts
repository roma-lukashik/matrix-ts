import { AggregateMatrixOperator } from './common'
import { Matrix, MatrixAxes } from '../types'
import { isMatrixN, ndim, reshape, shape } from '../geometry'
import { ones } from '../creation'

export type KeepdimAggregateMatrixOperator = <
  T extends Matrix,
  K extends MatrixAxes<T>
>(matrix: T, ...axes: K) => T

export const keepdim = (fn: AggregateMatrixOperator): KeepdimAggregateMatrixOperator => (matrix, ...axes) =>
  _keepdim(fn(matrix, ...axes), matrix, axes)

const _keepdim = <T extends Matrix>(matrix: Matrix, original: T, axes: number[]): T =>
  isMatrixN(matrix) ?
    reshape(matrix, shape(original).map((x, i) => axes.includes(i) ? 1 : x)) as T :
    reshape(matrix, ones(ndim(original))) as T
