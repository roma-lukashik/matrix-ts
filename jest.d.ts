import { Matrix } from './src'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualMatrix(expected: Matrix): CustomMatcherResult;
    }
  }
}

export {}
