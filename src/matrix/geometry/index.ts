import { arrlen, empty, first } from '../../utils/array'
import { error, nullish } from '../../utils/function'
import {
  Matrix,
  Matrix0,
  Matrix1,
  Matrix2,
  MatrixSize,
  Matrix3,
  Matrix4,
  MatrixAxes,
  MatrixN,
  SubMatrix,
  Vector,
  Size2Matrix,
} from '../types'
import { zero } from '../../utils/math'
import { prod } from '../aggregation'
import { arange, zeros } from '../creation'
import { nmap } from '../iteration'

type At = <
  T extends MatrixN,
  K extends MatrixAxes<T>
>(matrix: T, ...axes: K) => SubMatrix<T, K>

export const at: At = (matrix, ...[d0, ...dn]) => {
  const i = d0 < 0 ? len(matrix) + d0 : d0
  if (nullish(matrix[i])) {
    return error(`Index ${i} out of bounds [0, ${len(matrix) - 1}].`)
  }
  return len(dn) > 0 ? at(matrixn(matrix[i]), ...dn) as any : matrix[i]
}

export const shape = <
  T extends Matrix,
>(matrix: T): MatrixSize<T> =>
  isMatrixN(matrix) ? [len(matrix), ...shape(first(matrix))] as MatrixSize<T> : [] as MatrixSize<T>

export const reshape = <
  T extends Vector
>(matrix: Matrix, dn: T): Size2Matrix<T> => {
  if (size(matrix) === prod(matrix1(dn))) {
    return _reshape(flatten(matrix), dn)
  }
  return error(`Incompatible shape (${dn}) for reshaping of (${shape(matrix)}) matrix.`)
}

const _reshape = <
  U extends number[],
  V extends Size2Matrix<U>
>(matrix: Matrix1, [d0, ...dn]: U, skip = 0): V =>
  arange(d0).map((i) => empty(dn) ? at(matrix, skip + i) : _reshape(matrix, dn, prod(dn) * i + skip)) as V

type TransposeFn = {
  <T1 extends MatrixN>(matrix: T1): T1
  <T1 extends MatrixN, T2 extends MatrixSize<T1>>(matrix: T1, ...dn: T2): T1
}

export const transpose: TransposeFn = <
  T1 extends MatrixN,
  T2 extends MatrixSize<T1>
>(matrix: T1, ...order: T2): T1 => {
  const forward = len(order) ? order : arange(ndim(matrix)).reverse()
  const backward = forward.map((x, i) => [x, i]).sort(([a], [b]) => a - b).map((x) => x[1])
  const transposed = zeros(...shuffle(shape(matrix), forward)) as unknown as T1
  return nmap(transposed, (_, ...dn) => matrix0(at(matrix, ...shuffle(dn, backward) as MatrixAxes<T1>)))
}

const shuffle = <T extends MatrixN>(matrix: T, order: number[]) => order.map((i) => matrix[i]) as T

export const flatten = (matrix: Matrix): Matrix1 =>
  isMatrixN(matrix) ? matrix.flatMap(flatten) : [matrix]

export const partition = <
  T extends Matrix,
  U extends (
    T extends Matrix0 ? [] :
    T extends Matrix1 ? [[number, number]] :
    T extends Matrix2 ? [[number, number], [number, number]] :
    T extends Matrix3 ? [[number, number], [number, number], [number, number]] :
    T extends Matrix4 ? [[number, number], [number, number], [number, number], [number, number]] :
    [number, number][]
  )
>(matrix: T, ...[d0, ...rest]: U): T =>
  d0 && isMatrixN(matrix) ? matrix.slice(...d0).map((x) => partition(x, ...rest)) as T : matrix

export const newaxis = <T extends Matrix>(matrix: T, axis: number): T[] =>
  zero(axis) || isMatrix0(matrix) ? [matrix] : matrix.map((x) => newaxis(x, axis - 1)) as T[]

// Number of elements.
export const size = (matrix: Matrix): number => isMatrixN(matrix) ? prod(shape(matrix)) : 1

// Number of rows.
export const len = (matrix: Matrix): number => isMatrixN(matrix) ? arrlen(matrix) : 0

// Number of dimensions.
export const ndim = (matrix: Matrix): number => arrlen(shape(matrix))

export const matrix0 = (value: Matrix): Matrix0 =>
  isMatrixN(value) ? error(`Value is not an instance of Matrix0`) : value

export const matrix1 = (value: Matrix): Matrix1 =>
  isMatrix1(value) ? value : error(`Value is not an instance of Matrix1`)

// Typesafe casting value to MatrixN.
export const matrixn = <T extends MatrixN>(value: Matrix0 | T): T =>
  isMatrixN(value) ? value : error(`Value ${value} is not an instance of MatrixN`)

export const isMatrix0 = (matrix: Matrix): matrix is Matrix0 => !isMatrixN(matrix)

export const isMatrix1 = (matrix: Matrix): matrix is Matrix1 => ndim(matrix) === 1

export const isMatrix2 = (matrix: Matrix): matrix is Matrix2 => ndim(matrix) === 2

export const isMatrixN = <T extends MatrixN>(matrix: Matrix0 | T): matrix is T => Array.isArray(matrix)
