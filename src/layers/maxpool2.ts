import { at, Matrix3, max, partition, shape, zeros } from '../matrix'
import { range } from '../utils/array'
import { idivide } from '../utils/math'

export const forward = (input: Matrix3): Matrix3 => {
  const [h, w, f] = shape(input)
  return range(0, idivide(h, 2)).map((i) =>
    range(0, idivide(w, 2)).map((j) =>
      max(frame2x2xN(input, i, j, f), [0, 1]),
    ),
  )
}

export const backward = (input: Matrix3, gradient: Matrix3): Matrix3 => {
  const [h, w, f] = shape(input)
  const dLdInput = zeros(h, w, f)

  range(0, idivide(h, 2)).forEach((i) =>
    range(0, idivide(w, 2)).forEach((j) => {
      const frame = frame2x2xN(input, i, j, f)
      const amax = max(frame, [0, 1])

      frame.forEach((x, i1) => {
        x.forEach((y, j1) => {
          y.forEach((z, f1) => {
            if (z === at(amax, f1)) {
              dLdInput[i * 2 + i1][j * 2 + j1][f1] = at(gradient, i, j, f1)
            }
          })
        })
      })
    }),
  )

  return dLdInput
}

const frame2x2xN = (input: Matrix3, i: number, j: number, f: number) =>
  partition(input, [i * 2, i * 2 + 2], [j * 2, j * 2 + 2], [0, f])
