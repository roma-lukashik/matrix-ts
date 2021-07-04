import { arange, at, Matrix3, max, neach, partition, shape, zeros } from '../../matrix'
import { idivide } from '../../utils/math'

export class Maxpool2 {
  public forward(input: Matrix3): Matrix3 {
    return this.frames(input).map((row) =>
      row.map((frame) => max(frame, [0, 1])),
    )
  }

  public backward(input: Matrix3, gradient: Matrix3): Matrix3 {
    const dLdInput = zeros(...shape(input))

    this.frames(input).forEach((row, i) => {
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

  private frames(input: Matrix3) {
    const [h, w, f] = shape(input)
    return arange(idivide(h, 2)).map((i) =>
      arange(idivide(w, 2)).map((j) => this.frame2x2xN(input, i, j, f)),
    )
  }

  private frame2x2xN(input: Matrix3, i: number, j: number, f: number) {
    return partition(input, [i * 2, i * 2 + 2], [j * 2, j * 2 + 2], [0, f])
  }
}
