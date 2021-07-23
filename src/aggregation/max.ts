import { AggregateMatrixOperator, aggregator } from './common'
import { broadcast } from '../binary-operation/broadcast'

export const max: AggregateMatrixOperator = aggregator((a, b) => broadcast(a, b, Math.max))
