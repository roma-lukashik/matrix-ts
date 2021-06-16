export const identity = <T>(x: T, ..._rest: any[]): T => x

export const constant = <T>(x: T): (...args: any[]) => T => () => x

export const error = (message: string): never => { throw new Error(message) }
