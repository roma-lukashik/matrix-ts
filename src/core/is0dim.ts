import { Matrix, Matrix0 } from '../types'
import { not } from '../utils/function'
import { isNdim } from './isndim'

export const is0dim = (matrix: Matrix): matrix is Matrix0 => not(isNdim(matrix))
