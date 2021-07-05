import { Matrix } from '../utils/types'
import { nmap } from '../iteration'

export const exp = <T extends Matrix>(matrix: T): T => nmap(matrix, Math.exp)

export const log = <T extends Matrix>(matrix: T): T => nmap(matrix, Math.log)
