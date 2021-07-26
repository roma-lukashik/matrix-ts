import { MatrixN, Size2Matrix } from '../types'
import { not } from '../utils/function'
import { empty } from '../utils/array'

export const create = <
  T extends number[],
  K extends T,
>(fill: (...args: K) => number, ...dn: T): Size2Matrix<T> =>
  _create(fill, dn) as Size2Matrix<T>

const _create = (fill: (...dn: number[]) => number, [d0, ...dn]: number[], ...axes: number[]): MatrixN =>
  Array.from({ length: d0 }, (_, i) => not(empty(dn)) ? _create(fill, dn, ...axes, i) : fill(...axes, i))
