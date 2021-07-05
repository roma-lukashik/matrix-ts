import { Softmax } from '.'
import { arange, reshape } from '../../matrix'

describe('Softmax', () => {
  const [h, w, f] = [2, 2, 4]
  const inputLength = h * w * f
  const outputLength = 10
  const input = reshape(arange(inputLength), [h, w, f])
  const inc = (start: number) => () => start += 0.1

  it('#forward', () => {
    const softmax = new Softmax({
      inputLength,
      outputLength,
      weightInitializer: inc(0),
    })
    expect(softmax.forward(input)).toEqualMatrix([
      0.001, 0.001, 0.003, 0.006, 0.012, 0.026, 0.056, 0.118, 0.249, 0.528,
    ])
  })

  it('#backward', () => {
    const softmax = new Softmax({
      inputLength,
      outputLength,
      weightInitializer: inc(0),
    })
    const gradient = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    softmax.forward(input)
    expect(softmax.backward(gradient, 0.005)).toEqualMatrix([
      [
        [-0.00031895, -0.00031895, -0.00031895, -0.00031895],
        [-0.00031895, -0.00031895, -0.00031895, -0.00031895],
      ],
      [
        [-0.00031895, -0.00031895, -0.00031895, -0.00031895],
        [-0.00031895, -0.00031895, -0.00031895, -0.00031895],
      ],
    ])
  })
})
