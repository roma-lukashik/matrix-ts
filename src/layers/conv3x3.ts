import { randn } from '../random'
import { divide, Matrix2, Matrix3, multiply, sample, shape } from '../matrix'
import { range } from '../utils/array'

export const conv3x3 = (filtersNumber: number): Matrix3 => divide(randn(filtersNumber, 3, 3), 9)

export const forward = (input: Matrix2, filters: Matrix3): Matrix3 => {
  const [h, w] = shape(input)
  return range(0, h - 2).map((i) =>
    range(0, w - 2).map((j) =>
      multiply(frame3x3(input, i, j), filters) // add sum by axis (1,2)
    )
  )
}

const frame3x3 = (input: Matrix2, i: number, j: number): Matrix2 =>
  sample(input, [i, i + 3], [j, j + 3])
