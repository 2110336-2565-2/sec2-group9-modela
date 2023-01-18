export interface Configuration {
  port: number
}

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 4321,
})
