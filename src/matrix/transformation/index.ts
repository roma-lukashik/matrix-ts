import { Matrix } from '../utils/types'
import { nmap } from '../iteration'

export const exp = <T extends Matrix>(matrix: T): T => transform(matrix, Math.exp)

export const log = <T extends Matrix>(matrix: T): T => transform(matrix, Math.log)

const transform = <
  T extends Matrix
>(matrix: T, fn: (x: number) => number): T => nmap(matrix, (x: number, ..._dn: number[]) => fn(x))
