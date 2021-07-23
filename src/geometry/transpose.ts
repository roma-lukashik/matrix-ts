import { Matrix0, MatrixAxes, MatrixN, MatrixSize } from '../types'
import { arange } from '../creation/arange'
import { ndim } from '../core/ndim'
import { shape } from './shape'
import { at } from '../core/at'
import { create } from '../creation/create'
import { not } from '../utils/function'
import { empty } from '../utils/array'

export const transpose = <
  T1 extends MatrixN,
  T2 extends MatrixSize<T1>
>(matrix: T1, ...dn: T2 | []): T1 => {
  const forward = order(matrix, dn)
  const backward = reversedOrder(forward)
  return _transpose(matrix, forward, backward)
}

const _transpose = <
  T1 extends MatrixN,
>(matrix: T1, forward: MatrixSize<T1>, backward: MatrixSize<T1>): T1 =>
  create(
    (...dn) => at(matrix, ...shuffle(dn, backward) as MatrixAxes<T1>) as Matrix0,
    ...shuffle(shape(matrix), forward),
  ) as unknown as T1

const order = <
  T extends number[],
>(matrix: MatrixN, dn: T | []): T =>
  not(empty(dn)) ? dn as T : arange(ndim(matrix)).reverse() as T

const reversedOrder = <T extends number[]>(dn: T): T =>
  dn.map((x, i) => [x, i]).sort(([a], [b]) => a - b).map((x) => x[1]) as T

const shuffle = <T extends number[]>(matrix: T, order: T): T =>
  order.map((i) => matrix[i]) as T
