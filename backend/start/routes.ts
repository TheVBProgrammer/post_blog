/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PostController = () => import('#controllers/posts_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
//const AuthMiddleware = () => import('#middleware/auth_middleware')
//const GuestMiddleware = () => import('#middleware/guest_middleware')

/*router.get('/', async () => {
  return {
    hello: 'world',
  }
})*/
router.get('/', [PostController, 'index'])
router.get('/posts/:id', [PostController, 'load_post'])
router.post('/posts/view', [PostController, 'view'])
router.get('/users', [UsersController, 'index'])
router.post('/logout', [AuthController, 'logout'])
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'profile']) //.use([GuestMiddleware])
