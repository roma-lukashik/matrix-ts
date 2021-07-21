import { error, nullish } from '../utils/function'
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
  SubMatrix,
} from '../types'
import { zero } from '../utils/math'
import { arange } from '../creation/arange'
import { zeros } from '../creation/zeros'
import { nmap } from '../iteration'
import { isNdim } from '../core/isndim'
import { len } from '../core/len'
import { ndim } from '../core/ndim'
import { matrix0 } from '../core/matrix0'
import { matrixn } from '../core/matrixn'
import { is0dim } from '../core/is0dim'
import { shape } from './shape'

type At = <
  T extends MatrixN,
  K extends MatrixAxes<T>
>(matrix: T, ...axes: K) => SubMatrix<T, K>

export const at: At = (matrix, ...[d0, ...dn]) => {
  const i = d0 < 0 ? len(matrix) + d0 : d0
  if (nullish(matrix[i])) {
    return error(`Index ${i} out of bounds [0, ${len(matrix) - 1}].`)
  }
  return len(dn) > 0 ? at(matrixn(matrix[i]), ...dn) as any : matrix[i]
}

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

export const newaxis = <T extends Matrix>(matrix: T, axis: number): T[] =>
  zero(axis) || is0dim(matrix) ? [matrix] : matrix.map((x) => newaxis(x, axis - 1)) as T[]

