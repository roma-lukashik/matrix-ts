import { aggregator } from './common'
import { multiply } from '../binary-operation'

/**
 * Return the product of array elements over a given axis.
 * The default, axis=None, calculates the product of all the elements in the input array.
 */
export const prod = aggregator(multiply)
