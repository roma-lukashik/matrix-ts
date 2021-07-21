import { Matrix } from '../types'
import { first } from '../utils/array'
import { isNdim } from './isndim'

// Number of dimensions.
export const ndim = (matrix: Matrix): number => isNdim(matrix) ? 1 + ndim(first(matrix)) : 0
