import { Size2Matrix } from '../types'
import { array, empty } from '../utils/array'

export const create = <
  T extends number[]
>(fill: () => number, ...[d0, ...dn]: T): Size2Matrix<T> =>
  array(d0, () => empty(dn) ? fill() : create(fill, ...dn)) as Size2Matrix<T>
