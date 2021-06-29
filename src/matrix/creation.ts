import { array } from '../utils/array'
import { constant, identity } from '../utils/function'
import { rand } from '../utils/random'
import { len } from './geometry'
import { Matrix1, Vector2Matrix, VectorN } from './types'

export const create = <T extends VectorN, U extends Vector2Matrix<T>>(fill: () => number, ...[d0, ...dn]: T): U =>
  array(d0, () => len(dn) ? create(fill, ...dn): fill()) as U

export const zeros = <T extends VectorN>(...dn: T) => create(constant(0), ...dn)

export const ones = <T extends VectorN>(...dn: T) => create(constant(1), ...dn)

export const arange = (dn: number): Matrix1 => array(dn, identity)

// Return samples from the "standard normal" distribution.
export const randn = <T extends VectorN>(...dn: T) => create(rand, ...dn)
