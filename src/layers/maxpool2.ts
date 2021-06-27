import { at, Matrix3, max, neach, partition, shape, zeros } from '../matrix'
import { range } from '../utils/array'
import { idivide } from '../utils/math'

export const forward = (input: Matrix3): Matrix3 =>
  frames(input).map((row) =>
    row.map((frame) => max(frame, [0, 1])),
  )

export const backward = (input: Matrix3, gradient: Matrix3): Matrix3 => {
  const dLdInput = zeros(...shape(input))
  frames(input).forEach((row, i) => {
    row.forEach((frame, j) => {
      const amax = max(frame, [0, 1])
      neach(frame, (x, k, l, m) => {
        if (x === at(amax, m)) {
          dLdInput[i * 2 + k][j * 2 + l][m] = at(gradient, i, j, m)
        }
      })
    })
  })
  return dLdInput
}

const frames = (input: Matrix3) => {
  const [h, w, f] = shape(input)
  return range(0, idivide(h, 2)).map((i) =>
    range(0, idivide(w, 2)).map((j) =>
      frame2x2xN(input, i, j, f)
    ),
  )
}

const frame2x2xN = (input: Matrix3, i: number, j: number, f: number) =>
  partition(input, [i * 2, i * 2 + 2], [j * 2, j * 2 + 2], [0, f])
