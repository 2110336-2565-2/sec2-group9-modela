export interface Configuration {
  port: number
}

export const configuration = () => {
  return { port: parseInt(process.env.PORT, 10) || 4321 }
}
