import { randn, shape } from '../matrix'
import { Maxpool2 } from './maxpool2'

describe('maxpool2', () => {
  const input = randn(26, 26, 8)

  it('#forward', () => {
    const maxpool2 = new Maxpool2()
    const output = maxpool2.forward(input)
    expect(shape(output)).toEqual([13, 13, 8])
  })

  it('#backward', () => {
    const maxpool2 = new Maxpool2()
    const gradient = randn(13, 13, 8)
    const output = maxpool2.backward(input, gradient)
    expect(shape(output)).toEqual([26, 26, 8])
  })
})
