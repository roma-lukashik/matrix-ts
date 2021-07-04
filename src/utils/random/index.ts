// Standard Normal variate using Box-Muller transform.
export const normal = (): number => Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random())

export const uniform = (): number => 2 * random() - 1

// Random value between (0, 1].
export const random = (): number => 1 - Math.random()
