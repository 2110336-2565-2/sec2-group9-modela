export interface Configuration {
  port: number
  jwt: {
    secret: string
    expires: number
  }
}

export const configuration = () => {
  return {
    port: parseInt(process.env.PORT, 10) || 4321,
    jwt: {
      secret: process.env.JWT_SECRET,
      expires: process.env.JWT_EXPIRES,
    },
  }
}
