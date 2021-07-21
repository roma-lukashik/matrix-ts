import { Matrix, Matrix0 } from '../types'
import { isNdim } from './isndim'

export const is0dim = (matrix: Matrix): matrix is Matrix0 => !isNdim(matrix)
