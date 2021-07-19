import { create } from './create'
import { constant } from '../../utils/function'

export const zeros = <
  T extends number[]
>(...dn: T) => create(constant(0), ...dn)
