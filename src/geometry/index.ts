import {
  Matrix,
  Matrix0,
  Matrix1,
  Matrix2,
  MatrixSize,
  Matrix3,
  Matrix4,
  MatrixAxes,
  MatrixN,
} from '../types'
import { arange } from '../creation/arange'
import { zeros } from '../creation/zeros'
import { nmap } from '../iteration'
import { isNdim } from '../core/isndim'
import { len } from '../core/len'
import { ndim } from '../core/ndim'
import { matrix0 } from '../core/matrix0'
import { at } from '../core/at'
import { shape } from './shape'

type TransposeFn = {
  <T1 extends MatrixN>(matrix: T1): T1
  <T1 extends MatrixN, T2 extends MatrixSize<T1>>(matrix: T1, ...dn: T2): T1
}

export const transpose: TransposeFn = <
  T1 extends MatrixN,
  T2 extends MatrixSize<T1>
>(matrix: T1, ...order: T2): T1 => {
  const forward = len(order) ? order : arange(ndim(matrix)).reverse()
  const backward = forward.map((x, i) => [x, i]).sort(([a], [b]) => a - b).map((x) => x[1])
  const transposed = zeros(...shuffle(shape(matrix), forward)) as unknown as T1
  return nmap(transposed, (_, ...dn) => matrix0(at(matrix, ...shuffle(dn, backward) as MatrixAxes<T1>)))
}

const shuffle = <T extends MatrixN>(matrix: T, order: number[]) => order.map((i) => matrix[i]) as T

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
