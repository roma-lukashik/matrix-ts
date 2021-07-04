import { Matrix } from './src/matrix'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualMatrix(expected: Matrix): CustomMatcherResult;
    }
  }
}

export {}
