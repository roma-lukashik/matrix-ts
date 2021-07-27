import {
  Matrix,
  Matrix0,
  Matrix1,
  Matrix2,
  Matrix3,
  Matrix4,
} from '../types'
import { isNdim } from '../core/isndim'

export const partition = <
  T extends Matrix,
  U extends (
    T extends Matrix0 ? [] :
    T extends Matrix1 ? [[number, number]] :
    T extends Matrix2 ? [[number, number], [number, number]] :
    T extends Matrix3 ? [[number, number], [number, number], [number, number]] :
    T extends Matrix4 ? [[number, number], [number, number], [number, number], [number, number]] :
    [number, number][]
  )
>(matrix: T, ...[d0, ...rest]: U): T =>
  d0 && isNdim(matrix) ? matrix.slice(...d0).map((x) => partition(x, ...rest)) as T : matrix
