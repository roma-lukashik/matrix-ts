export const identity = <T>(x: T): () => T => () => x

export const error = (message: string): never => { throw new Error(message) }
