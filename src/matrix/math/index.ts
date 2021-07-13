import { Matrix, Matrix0 } from '../utils/types'
import { isMatrix0 } from '../geometry'

const operator = (fn: (x: Matrix0) => Matrix0) =>
  <T extends Matrix>(matrix: T): T => nmap(matrix, fn)

const nmap = <T extends Matrix>(matrix: T, fn: (x: Matrix0) => Matrix0): T =>
  isMatrix0(matrix) ? fn(matrix) as T : matrix.map((x) => nmap(x, fn)) as T

export const exp = operator(Math.exp)

export const log = operator(Math.log)

export const sqrt = operator(Math.sqrt)

export const abs = operator(Math.abs)

export const pow2 = operator((x: number) => x ** 2)
