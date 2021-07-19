import { aggregator } from './common'
import { broadcast } from '../binary-operation'

export const min = aggregator((a, b) => broadcast(a, b, Math.min))
