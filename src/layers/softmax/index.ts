import {
  add,
  at,
  create,
  divide,
  dot,
  exp,
  matmul,
  Matrix1,
  Matrix2,
  Matrix3,
  multiply,
  newaxis,
  reshape,
  shape,
  subtract,
  sum,
  zeros,
} from '../../matrix'
import { flatten } from '../../utils/array'
import { normal } from '../../utils/random'

type Options = {
  inputLength: number;
  outputLength: number;
  weightInitializer?: () => number;
}

export class Softmax {
  private weight: Matrix2
  private biases: Matrix1
  private input: Matrix3

  constructor({
    inputLength,
    outputLength,
    weightInitializer = normal,
  }: Options) {
    this.weight = divide(create(weightInitializer, inputLength, outputLength), inputLength)
    this.biases = zeros(outputLength)
  }

  public forward(input: Matrix3): Matrix1 {
    this.input = input
    const totals = this.totals(input)
    const exps = exp(totals)
    return divide(exps, sum(exps, [0]))
  }

  public backward(output: Matrix1, learningRate: number): Matrix3 {
    const totals = this.totals(this.input)
    const exps = exp(totals)
    const expsum = sum(exps)

    // Only 1 element from output should be nonzero.
    const i = output.findIndex((x) => x !== 0)
    const gradient = at(output, i)

    // Gradients of output against totals.
    const dOdt = divide(multiply(-at(exps, i), exps), expsum ** 2)
    dOdt[i] = at(exps, i) * (expsum - at(exps, i)) / (expsum ** 2)

    // Gradients of totals against weights/biases/input.
    const dTdW = flatten(this.input)
    const dTdB = 1
    const dTdInputs = this.weight

    // Gradients of loss against totals.
    const dLdT = multiply(gradient, dOdt)

    // Gradients of loss against weights/biases/input.
    const dLdW = matmul(newaxis(dTdW, 1), newaxis(dLdT, 0))
    const dLdB = multiply(dLdT, dTdB)
    const dLdInput = matmul(dTdInputs, dLdT)

    // Update weights / biases.
    this.weight = subtract(this.weight, multiply(dLdW, learningRate))
    this.biases = subtract(this.biases, multiply(dLdB, learningRate))

    return reshape(dLdInput, shape(this.input))
  }

  private totals(input: Matrix3) {
    return add(dot(flatten(input), this.weight), this.biases)
  }
}
