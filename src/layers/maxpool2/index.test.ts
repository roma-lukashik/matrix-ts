import { Maxpool2 } from '.'
import { create, shape } from '../../matrix'
import { normal } from '../../utils/random'

describe('Maxpool2', () => {
  const input = create(normal, 26, 26, 8)
  const gradient = create(normal, 13, 13, 8)

  it('#forward', () => {
    const maxpool2 = new Maxpool2()
    const output = maxpool2.forward(input)
    expect(shape(output)).toEqual([13, 13, 8])
  })

  it('#backward', () => {
    const maxpool2 = new Maxpool2()
    const output = maxpool2.backward(input, gradient)
    expect(shape(output)).toEqual([26, 26, 8])
  })
})
