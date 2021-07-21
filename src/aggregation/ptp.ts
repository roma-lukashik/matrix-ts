import { AggregateMatrixOperator } from './common'
import { min } from './min'
import { max } from './max'
import { subtract } from '../binary-operation/subtract'

export const ptp: AggregateMatrixOperator = (matrix, ...axes) =>
  subtract(max(matrix, ...axes), min(matrix, ...axes))
