import { Matrix, Matrix1 } from '../types'
import { ndim } from './ndim'

export const is1dim = (matrix: Matrix): matrix is Matrix1 => ndim(matrix) === 1
