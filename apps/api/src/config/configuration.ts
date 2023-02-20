export interface Configuration {
  port: number
  jwt: {
    secret: string
    expires: string
  }
  cookie: {
    secure: boolean
  }
  enableCors: boolean
  aws: {
    accessKeyId: string
    secretAccessKey: string
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
    enableCors: process.env.ENABLE_CORS === 'true',
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }
}
