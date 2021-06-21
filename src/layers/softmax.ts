import { add, divide, dot, MatrixN, randn, zeros } from '../matrix'
import { flatten } from '../utils/array'

export const forward = (input: MatrixN, length: number, nodes: number) => {
  const weight = divide(randn(length, nodes), length)
  const biases = zeros(nodes)
  const totals = add(dot(flatten(input), weight), biases)
  return totals
}
