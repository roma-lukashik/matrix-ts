import { array, empty } from '../../utils/array'
import { constant, identity } from '../../utils/function'
import { Matrix1, Size2Matrix } from '../types'

export const create = <T extends number[]>(fill: () => number, ...[d0, ...dn]: T): Size2Matrix<T> =>
  array(d0, () => empty(dn) ? fill() : create(fill, ...dn)) as Size2Matrix<T>

export const zeros = <T extends number[]>(...dn: T) => create(constant(0), ...dn)

export const ones = <T extends number[]>(...dn: T) => create(constant(1), ...dn)

export const arange = (dn: number): Matrix1 => array(dn, identity)
