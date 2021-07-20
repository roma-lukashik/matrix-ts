import { mean } from './mean'
import { keepdim } from './keepdim'

export const meankeepdim = keepdim(mean)
