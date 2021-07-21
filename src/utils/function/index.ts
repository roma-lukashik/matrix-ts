export const identity = <T>(x: T, ..._rest: any[]): T => x

export const constant = <T>(x: T): (...args: any[]) => T => () => x

export const error = (message: string): never => { throw new Error(message) }

export const notnullish = <T>(x: T | undefined | null): x is T => x != null

export const nullish = <T>(x: T | undefined | null): x is undefined | null => x == null

export const not = (value: any): boolean => !value
