export const range = (start: number, end: number): number[] =>
  [...Array(end - start).keys()].map((i) => i + start)

export const reverse = <T extends any>(array: T[]): T[] => [...array].reverse()

export const zip = <T1 extends any, T2 extends any>(arr1: T1[], arr2: T2[]): Array<[T1, T2]> => {
  const length = Math.min(arr1.length, arr2.length)
  return arr1.slice(0, length).map<[T1, T2]>((item, i) => [item, arr2[i]])
}
