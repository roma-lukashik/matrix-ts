import { Matrix, Matrix1 } from '../types'
import { error } from '../utils/function'
import { is1dim } from './is1dim'

/**
 * Typesafe casting value to Matrix1.
 */
export const matrix1 = (value: Matrix): Matrix1 =>
  is1dim(value) ? value : error(`Value is not an instance of Matrix1`)
