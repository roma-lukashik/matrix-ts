export const range = (start: number, end: number): number[] =>
  [...Array(end - start).keys()].map((i) => i + start)
