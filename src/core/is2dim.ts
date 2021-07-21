import { Matrix, Matrix2 } from '../types'
import { ndim } from './ndim'

export const is2dim = (matrix: Matrix): matrix is Matrix2 => ndim(matrix) === 2
