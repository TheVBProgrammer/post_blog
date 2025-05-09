import { defineConfig } from '@adonisjs/auth'
import { basicAuthGuard, basicAuthUserProvider } from '@adonisjs/auth/basic_auth'
import User from '#models/user'

// @ts-ignore
const authConfig = defineConfig({
  default: 'basicAuth',
  guards: {
    basicAuth: basicAuthGuard({
      provider: basicAuthUserProvider({
        // @ts-ignore
        model: () => User,
      }),
    }),
  },
})

export default authConfig
