import { Matrix, MatrixSize } from '../types'
import { isNdim } from '../core/isndim'
import { len } from '../core/len'
import { first } from '../utils/array'

export const shape = <
  T extends Matrix
>(matrix: T): MatrixSize<T> =>
  isNdim(matrix) ? [len(matrix), ...shape(first(matrix))] as MatrixSize<T> : [] as MatrixSize<T>
