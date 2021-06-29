import { isMatrixN } from '../geometry'
import { Matrix } from '../utils/types'

export const exp = <T extends Matrix>(matrix: T): T =>
  isMatrixN(matrix) ? matrix.map(exp) as T : Math.exp(matrix) as T
