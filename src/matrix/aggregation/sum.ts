import { aggregator } from './common'
import { add } from '../binary-operation'

/**
 * Sum of array elements over a given axis.
 * The default, axis=None, sums all of the elements of the input array.
 */
export const sum = aggregator(add)
