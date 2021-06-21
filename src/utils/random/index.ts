// Standard Normal variate using Box-Muller transform.
export const rand = (): number => Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random())

// Random value between (0, 1].
export const random = (): number => 1 - Math.random()
