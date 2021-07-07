import {
  add,
  arange,
  at,
  create,
  divide,
  Matrix2,
  Matrix3,
  multiply,
  partition,
  shape,
  subtract,
  sum,
  zeros,
} from '../../matrix'
import { normal } from '../../utils/random'

type Options = {
  filtersNumber: number;
  frameSize: number;
  weightInitializer?: () => number;
}

export class Conv {
  private filters: Matrix3
  private input: Matrix2
  private readonly frameSize: number

  constructor({
    filtersNumber,
    frameSize,
    weightInitializer = normal,
  }: Options) {
    this.frameSize = frameSize
    // Divides by 9 to reduce the variance of our initial values.
    this.filters = divide(create(weightInitializer, filtersNumber, frameSize, frameSize), 9)
  }

  public forward(input: Matrix2): Matrix3 {
    this.input = input
    return this.frames(input).map((row) =>
      row.map((frame) => sum(multiply(frame, this.filters), [1, 2])),
    )
  }

  public backward(dLdOut: Matrix3, learningRate: number): Matrix3 {
    const dLdInput = zeros(...shape(this.filters))

    this.frames(this.input).forEach((row, i) =>
      row.forEach((frame, j) => {
        dLdInput.forEach((filter, f) => {
          dLdInput[f] = add(filter, multiply(at(dLdOut, i, j, f), frame))
        })
      })
    )

    return this.filters = subtract(this.filters, multiply(dLdInput, learningRate))
  }

  private frames(input: Matrix2) {
    const [h, w] = shape(input)
    return arange(h - this.frameSize + 1).map((i) =>
      arange(w - this.frameSize + 1).map((j) => this.frame3x3(input, i, j)),
    )
  }

  private frame3x3(input: Matrix2, i: number, j: number) {
    return partition(input, [i, i + this.frameSize], [j, j + this.frameSize])
  }
}
