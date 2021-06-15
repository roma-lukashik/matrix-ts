export const range = (start: number, end: number): number[] =>
  array(end - start, (i) => i + start)

export const array = <T extends any>(length: number, fill: (index: number) => T): T[] =>
  Array.from({ length }, (_, i) => fill(i))

export const reverse = <T extends any>(array: T[]): T[] => [...array].reverse()

export const zip = <T1 extends any, T2 extends any>(arr1: T1[], arr2: T2[]): Array<[T1, T2]> => {
  const length = Math.min(arr1.length, arr2.length)
  return range(0, length).map<[T1, T2]>((i) => [arr1[i], arr2[i]])
}
