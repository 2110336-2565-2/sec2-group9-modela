export interface Configuration {
  port: number
  jwt: {
    secret: string
    expires: string
  }
  cookie: {
    secure: boolean
  }
}

export const configuration = (): Configuration => {
  return {
    port: parseInt(process.env.PORT, 10) || 4321,
    jwt: {
      secret: process.env.JWT_SECRET,
      expires: process.env.JWT_EXPIRES,
    },
    cookie: {
      secure: process.env.COOKIE_SECURE === 'true',
    },
  }
}
