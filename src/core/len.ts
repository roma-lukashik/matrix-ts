import { Matrix } from '../types'
import { arrlen } from '../utils/array'
import { isNdim } from './isndim'

// Number of rows.
export const len = (matrix: Matrix): number => isNdim(matrix) ? arrlen(matrix) : 0
