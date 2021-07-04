import { Conv3x3 } from '.'
import { arange, reshape } from '../../matrix'

describe('Conv3x3', () => {
  const filters = 4
  const input = reshape(arange(5 * 5), [5, 5])
  const gradient = reshape(arange(3 * 3 * 4), [3, 3, 4])
  const inc = (start: number) => () => start++

  it('#forward', () => {
    const conv3x3 = new Conv3x3({ filters, weightInitializer: inc(0) })
    const output = conv3x3.forward(input)
    expect(output).toEqualMatrix([
      [
        [34.667, 88.667, 142.667, 196.667],
        [38.667, 101.667, 164.667, 227.667],
        [42.667, 114.667, 186.667, 258.667],
      ],
      [
        [54.667, 153.667, 252.667, 351.667],
        [58.667, 166.667, 274.667, 382.667],
        [62.667, 179.667, 296.667, 413.667],
      ],
      [
        [74.667, 218.667, 362.667, 506.667],
        [78.667, 231.667, 384.667, 537.667],
        [82.667, 244.667, 406.667, 568.667],
      ],
    ])
  })

  it('#backward', () => {
    const conv3x3 = new Conv3x3({ filters, weightInitializer: inc(0) })
    const output = conv3x3.backward(input, gradient, 0.05)
    expect(output).toEqualMatrix([
      [
        [-62.400, -69.489, -76.578],
        [-98.067, -105.156, -112.244],
        [-133.733, -140.822, -147.911],
      ],
      [
        [-64.100, -71.639, -79.178],
        [-102.017, -109.556, -117.094],
        [-139.933, -147.472, -155.011],
      ],
      [
        [-65.800, -73.789, -81.778],
        [-105.967, -113.956, -121.944],
        [-146.133, -154.122, -162.111],
      ],
      [
        [-67.500, -75.939, -84.378],
        [-109.917, -118.356, -126.794],
        [-152.333, -160.772, -169.211],
      ],
    ])
  })
})
