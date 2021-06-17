import { Matrix1, Matrix3, max, sample, shape } from '../matrix'
import { range } from '../utils/array'
import { idivide } from '../utils/math'

export const forward = (input: Matrix3): Matrix3 => {
  const [h, w, n] = shape(input)
  return range(0, idivide(h, 2)).map((i) =>
    range(0, idivide(w, 2)).map((j) =>
      max(frame2x2xN(input, i, j, n), [0, 1]) as Matrix1
    )
  )
}

const frame2x2xN = (input: Matrix3, i: number, j: number, n: number): Matrix3 =>
  sample(input, [i * 2, i * 2 + 2], [j * 2, j * 2 + 2], [0, n])
