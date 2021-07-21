import { AggregateMatrixOperator } from './common'
import { sum } from './sum'
import { Matrix } from '../types'
import { divide } from '../binary-operation/divide'
import { size } from '../geometry'

export const mean: AggregateMatrixOperator = (matrix, ...axes) =>
  _mean(matrix, sum(matrix, ...axes))

const _mean = <T extends Matrix>(matrix: Matrix, sum: T): T =>
  divide(sum, divide(size(matrix), size(sum))) as T
