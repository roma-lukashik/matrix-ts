import { aggregator } from './common'
import { broadcast } from '../binary-operation'

export const max = aggregator((a, b) => broadcast(a, b, Math.max))
