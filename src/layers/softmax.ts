import { add, divide, dot, Matrix1, Matrix3, MatrixN, partition, zeros } from '../matrix'
import { flatten } from '../utils/array'
import { randn } from '../random'

export const forward = (input: MatrixN, length: number, nodes: number): Matrix1 => {
  const weight = divide(randn(length, nodes), length)
  const biases = zeros(nodes)
  const totals = add(dot(flatten(input), weight), biases)
}

const frame2x2xN = (input: Matrix3, i: number, j: number, n: number): Matrix3 =>
  partition(input, [i * 2, i * 2 + 2], [j * 2, j * 2 + 2], [0, n])
