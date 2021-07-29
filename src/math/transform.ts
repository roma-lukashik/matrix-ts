import { Matrix, Matrix0 } from '../types'
import { nmap } from '../iteration/nmap'

export const transform = (fn: (x: Matrix0, ...rest: number[]) => Matrix0) =>
  <T extends Matrix>(matrix: T): T => nmap(matrix, fn)
