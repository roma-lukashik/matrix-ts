import { Matrix0, MatrixN } from '../types'
import { error } from '../utils/function'
import { isNdim } from './isndim'

/**
 * Typesafe casting value to MatrixN.
 */
export const matrixn = <T extends MatrixN>(value: Matrix0 | T): T =>
  isNdim(value) ? value : error(`Value ${value} is not an instance of MatrixN`)
