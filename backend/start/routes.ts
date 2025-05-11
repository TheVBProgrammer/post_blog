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
router.post('/posts', [PostController, 'load_post'])
router.get('/post/edit/:Id', [PostController, 'editPost'])
router.post('/posts/all', [PostController, 'postSynchronize'])
router.post('/posts/view', [PostController, 'view'])
router.post('/user', [UsersController, 'getUser'])
router.post('/logout', [AuthController, 'logout'])
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'profile']) //.use([GuestMiddleware])
