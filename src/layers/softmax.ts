import { add, divide, dot, exp, Matrix1, Matrix3, randn, shape, sum, zeros } from '../matrix'
import { flatten } from '../utils/array'

export const forward = (input: Matrix3, nodes: number): Matrix1 => {
  const [h, w, z] = shape(input)
  const length = h * w * z
  const weight = divide(randn(length, nodes), length)
  const biases = zeros(nodes)
  const totals = add(dot(flatten(input), weight), biases) as Matrix1
  const exps = exp(totals)
  return divide(exps, sum(exps, [0]))
}
