import type { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { auth, response } = ctx
    // Skip middleware for the login route
    if (ctx.request.url().includes('/login')) {
      return await next()
    }

    if (auth.isAuthenticated) {
      return response.forbidden({ message: 'Already authenticated' })
    }
    await next()
  }
}
