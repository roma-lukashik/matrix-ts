import { create } from './create'
import { constant } from '../utils/function'

export const ones = <
  T extends number[]
>(...dn: T) => create(constant(1), ...dn)
