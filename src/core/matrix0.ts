import { Matrix, Matrix0 } from '../types'
import { error } from '../utils/function'
import { is0dim } from './is0dim'

/**
 * Typesafe casting value to Matrix0.
 */
export const matrix0 = (value: Matrix): Matrix0 =>
  is0dim(value) ? value : error('Value is not an instance of Matrix0')
