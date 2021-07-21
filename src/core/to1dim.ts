import { Matrix, Matrix1 } from '../types'
import { isNdim } from './isndim'

export const to1dim = (matrix: Matrix): Matrix1 =>
  isNdim(matrix) ? matrix.flatMap(to1dim) : [matrix]
