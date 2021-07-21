import { Matrix } from '../types'
import { isNdim } from './isndim'
import { len } from './len'
import { first } from '../utils/array'

// Number of elements.
export const size = (matrix: Matrix): number =>
  isNdim(matrix) ? len(matrix) * size(first(matrix)) : 1
