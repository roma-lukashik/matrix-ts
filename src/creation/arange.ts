import { Matrix1 } from '../types'
import { error, nullish } from '../utils/function'
import { create } from './create'

export const arange = (start: number, end?: number): Matrix1 =>
  _arange(boundaries(start, end))

const _arange = ([start, end]: [number, number]): Matrix1 =>
  start > end ? error(`Start (${start}) cannot be greater than end (${end}).`) : create((i) => i + start, end - start)

const boundaries = (start: number, end?: number): [number, number] =>
  nullish(end) ? [0, start] : [start, end]
