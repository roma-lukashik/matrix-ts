import { Matrix1, MatrixN } from '../types'
import { shape } from '../geometry/shape'
import { at } from '../core/at'

export const compatible = (a: MatrixN, b: MatrixN): boolean =>
  last(shape(a)) === second2last(shape(b))

const last = (x: Matrix1) => at(x, -1)

const second2last = (x: Matrix1) => at(x, -2)
