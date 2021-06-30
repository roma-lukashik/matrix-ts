import { error } from '../function'

export type ArrayN<T> = Array<T | ArrayN<T>>

export const array = <T>(length: number, fill: (index: number) => T): T[] =>
  Array.from({ length }, (_, i) => fill(i))

export const arrlen = (arr: any[]): number => arr.length

export const first = <T>(arr: T[]): T => arr[0]

export const zip = <T1, T2>(arr1: T1[], arr2: T2[]): Array<[T1, T2]> =>
  arrlen(arr1) === arrlen(arr2)
    ? arr1.map<[T1, T2]>((x, i) => [x, arr2[i]])
    : error(`Array(${arrlen(arr1)}) and Array(${arrlen(arr2)}) are not aligned.`)

export const flatten = <T>(arr: ArrayN<T>): T[] =>
  Array.isArray(arr) ? arr.flatMap(flatten) : arr
