import { Matrix, Matrix0 } from '../types'
import { nmap } from '../iteration'

const operator = (fn: (x: Matrix0, ...rest: number[]) => Matrix0) =>
  <T extends Matrix>(matrix: T): T => nmap(matrix, fn)

export const exp = operator(Math.exp)

export const log = operator(Math.log)

export const sqrt = operator(Math.sqrt)

export const abs = operator(Math.abs)

export const pow2 = operator((x: number) => x ** 2)
