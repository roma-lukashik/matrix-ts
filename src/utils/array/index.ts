import { error } from '../function'

export type ArrayN<T> = Array<T | ArrayN<T>>

export const array = <T>(length: number, fill: (index: number) => T): T[] =>
  Array.from({ length }, (_, i) => fill(i))

export const range = (start: number, end: number): number[] =>
  array(end - start, (i) => i + start)

export const size = (arr: any[]): number => arr.length

export const first = <T>(arr: T[]): T => arr[0]

export const zip = <T1, T2>(arr1: T1[], arr2: T2[]): Array<[T1, T2]> =>
  size(arr1) === size(arr2)
    ? arr1.map<[T1, T2]>((x, i) => [x, arr2[i]])
    : error(`Array(${size(arr1)}) and Array(${size(arr2)}) are not aligned.`)

export const flatten = <T>(arr: ArrayN<T>): T[] =>
  Array.isArray(arr) ? arr.flatMap(flatten) : arr
