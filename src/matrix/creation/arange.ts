import { Matrix1 } from '../types'
import { array } from '../../utils/array'
import { error, nullish } from '../../utils/function'

export const arange = (start: number, end?: number): Matrix1 =>
  _arange(boundaries(start, end))

const _arange = ([start, end]: [number, number]): Matrix1 =>
  start > end ? error(`Start (${start}) cannot be greater than end (${end}).`) : array(end - start, (i) => i + start)

const boundaries = (start: number, end?: number): [number, number] =>
  nullish(end) ? [0, start] : [start, end]
