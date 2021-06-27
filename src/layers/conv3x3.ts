import { add, at, divide, Matrix2, Matrix3, multiply, neach, partition, randn, shape, sum, zeros } from '../matrix'
import { range } from '../utils/array'

export const conv3x3 = (filtersNumber: number): Matrix3 => divide(randn(filtersNumber, 3, 3), 9)

export const forward = (input: Matrix2, filters: Matrix3): Matrix3 =>
  frames(input).map((row) =>
    row.map((frame) => sum(multiply(frame, filters), [1, 2])),
  )

export const backward = (input: Matrix2, filters: Matrix3, gradient: Matrix3) => {
  const [h, w, k] = shape(filters)
  const dLdInput = zeros(h, w, k)

  frames(input).forEach((row, i) =>
    row.forEach((frame, j) => {
      neach(range(0, k), (f) => {
        dLdInput[f] = add(at(dLdInput, f), multiply(at(gradient, i, j, f), frame))
      })
    })
  )

  return dLdInput
}

const frames = (input: Matrix2) => {
  const [h, w] = shape(input)
  return range(0, h - 2).map((i) =>
    range(0, w - 2).map((j) => frame3x3(input, i, j)),
  )
}

const frame3x3 = (input: Matrix2, i: number, j: number) =>
  partition(input, [i, i + 3], [j, j + 3])
