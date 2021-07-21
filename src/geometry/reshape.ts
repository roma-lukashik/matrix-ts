import { Matrix, Matrix1, Size2Matrix, Vector } from '../types'
import { size } from '../core/size'
import { error } from '../utils/function'
import { shape } from './shape'
import { arange } from '../creation/arange'
import { empty } from '../utils/array'
import { at } from './index'
import { len } from '../core/len'
import { to1dim } from '../core/to1dim'

export const reshape = <
  T extends Vector
>(matrix: Matrix, dn: T): Size2Matrix<T> => {
  if (size(matrix) === prod(dn)) {
    return _reshape(to1dim(matrix), dn)
  }
  return error(`Incompatible shape (${dn}) for reshaping of (${shape(matrix)}) matrix.`)
}

const _reshape = <
  U extends number[],
  V extends Size2Matrix<U>
>(matrix: Matrix1, [d0, ...dn]: U, skip = 0): V =>
  arange(d0).map((i) => empty(dn) ? at(matrix, skip + i) : _reshape(matrix, dn, prod(dn) * i + skip)) as V

const prod = (vector: number[]): number => len(vector) ? vector.reduce((a, b) => a * b) : 0
