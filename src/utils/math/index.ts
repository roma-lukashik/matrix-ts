export type BinaryOperator = (a: number, b: number) => number

export const add: BinaryOperator = (a, b) => a + b
export const subtract: BinaryOperator = (a, b) => a - b
export const multiply: BinaryOperator = (a, b) => a * b
export const divide: BinaryOperator = (a, b) => a / b
export const idivide: BinaryOperator = (a, b) => Math.floor(a / b)

export const zero = (x: number): boolean => x === 0

export const round = (x: number, eps = 1): number => Math.round(x / eps) * eps
