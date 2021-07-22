import { Matrix } from '../types'
import { zero } from '../utils/math'
import { is0dim } from '../core/is0dim'

export const newaxis = <
  T extends Matrix
>(matrix: T, axis: number): T[] =>
  zero(axis) || is0dim(matrix) ? [matrix] : matrix.map((x) => newaxis(x, axis - 1)) as T[]
