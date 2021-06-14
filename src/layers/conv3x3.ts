import { randn } from '../random'
import { divide, Matrix2, Matrix3, sample, shape, zeros } from '../matrix'
import { range } from '../utils/array'

export const conv3x3 = (filtersNumber: number): Matrix3 => divide(randn(filtersNumber, 3, 3), 9)

export const forward = (input: Matrix2, filtersNumber: number): Matrix3 => {
  const [h, w] = shape(input)
  const output = zeros(h - 2, w - 2, filtersNumber)
}

const frames3x3 = (input: Matrix2): Matrix2[] => {
  const [h, w] = shape(input)
  return range(0, h - 2).flatMap((i) =>
    range(0, w - 2).map((j) => frame3x3(input, i, j))
  )
}

const frame3x3 = (input: Matrix2, i: number, j: number): Matrix2 =>
  sample(input, [i, i + 3], [j, j + 3])
