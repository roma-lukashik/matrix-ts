import { Matrix } from '../utils/types'
import { nmap } from '../iteration'

export const exp = <T extends Matrix>(matrix: T): T => nmap(matrix, (x, ..._dn) => Math.exp(x))

export const log = <T extends Matrix>(matrix: T): T => nmap(matrix, (x, ..._dn) => Math.log(x))
