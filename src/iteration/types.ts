import { Matrix, Matrix0, MatrixSize } from '../types'

export type Fn<T extends Matrix, U> = T extends Matrix0 ? {
  (x: Matrix0): U;
} : {
  (x: Matrix0, ...dn: MatrixSize<T>): U;
}
