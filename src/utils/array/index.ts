import { error } from '../function'

export type ArrayN<T> = Array<T | ArrayN<T>>

export const array = <T extends any>(length: number, fill: (index: number) => T): T[] =>
  Array.from({ length }, (_, i) => fill(i))

export const range = (start: number, end: number): number[] =>
  array(end - start, (i) => i + start)

export const first = <T extends any>(arr: T[]): T => arr[0]

export const zip = <T1 extends any, T2 extends any>(arr1: T1[], arr2: T2[]): Array<[T1, T2]> =>
  arr1.length === arr2.length
    ? range(0, arr1.length).map<[T1, T2]>((i) => [arr1[i], arr2[i]])
    : error(`Array(${arr1.length}) and Array(${arr2.length}) are not aligned.`)

export const flatten = <T>(arr: ArrayN<T>): T[] =>
  Array.isArray(arr) ? arr.flatMap(flatten) : arr
