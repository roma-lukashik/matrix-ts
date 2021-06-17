export type BinaryOperator = (a: number, b: number) => number

export const add: BinaryOperator = (a, b) => a + b
export const subtract: BinaryOperator = (a, b) => a - b
export const multiply: BinaryOperator = (a, b) => a * b
export const divide: BinaryOperator = (a, b) => a / b
export const idivide: BinaryOperator = (a, b) => Math.floor(a / b)

