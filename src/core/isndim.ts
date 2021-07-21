import { Matrix0, MatrixN } from '../types'

export const isNdim = <T extends MatrixN>(matrix: Matrix0 | T): matrix is T => Array.isArray(matrix)
