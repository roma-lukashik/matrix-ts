import { AggregateMatrixOperator } from './common'
import { mean } from './mean'
import { meankeepdim } from './meankeepdim'
import { pow2, sqrt } from '../math'
import { subtract } from '../binary-operation/subtract'

/**
 * The standard deviation is the square root of the average of the squared deviations from the mean, i.e
 * std = sqrt(mean(x)), where x = (a - a.mean())**2.
 */
export const std: AggregateMatrixOperator = (matrix, ...axes) =>
  sqrt(mean(pow2(subtract(matrix, meankeepdim(matrix, ...axes))), ...axes))
