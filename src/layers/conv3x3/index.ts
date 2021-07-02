import {
  add,
  arange,
  at,
  divide,
  Matrix2,
  Matrix3,
  multiply,
  neach,
  partition,
  randn,
  shape,
  subtract,
  sum,
  zeros,
} from '../../matrix'

export class Conv3x3 {
  private filters: Matrix3

  constructor(filtersNumber: number) {
    // Divides by 9 to reduce the variance of our initial values.
    this.filters = divide(randn(filtersNumber, 3, 3), 9)
  }

  public forward(input: Matrix2): Matrix3 {
    return this.frames(input).map((row) =>
      row.map((frame) => sum(multiply(frame, this.filters), [1, 2])),
    )
  }

  public backward(input: Matrix2, gradient: Matrix3, learningRate: number): Matrix3 {
    const [h, w, k] = shape(this.filters)
    const dLdInput = zeros(h, w, k)

    this.frames(input).forEach((row, i) =>
      row.forEach((frame, j) => {
        neach(arange(h), (f) => {
          dLdInput[f] = add(at(dLdInput, f), multiply(at(gradient, i, j, f), frame))
        })
      })
    )

    return this.filters = subtract(this.filters, multiply(dLdInput, learningRate))
  }

  private frames(input: Matrix2) {
    const [h, w] = shape(input)
    return arange(h - 2).map((i) =>
      arange(w - 2).map((j) => this.frame3x3(input, i, j)),
    )
  }

  private frame3x3(input: Matrix2, i: number, j: number) {
    return partition(input, [i, i + 3], [j, j + 3])
  }
}
