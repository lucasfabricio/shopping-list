'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.resource('categories', 'CategoryController')
    .apiOnly()
    .middleware('auth', 'userAction')

Route.resource('items', 'ItemController')
    .apiOnly()
    .middleware('auth', 'userAction')

Route.resource('lists', 'ListController')
    .apiOnly()
    .middleware('auth', 'userAction')

Route.get('lists/details/:id', 'ListController.details')
    .middleware('auth')

Route.resource('products', 'ProductController')
    .apiOnly()
    .middleware('auth',)

Route.get('products/barcode/:bar_code', 'ProductController.barcode')
    .middleware('auth')

Route.resource('stores', 'StoreController')
    .apiOnly()
    .middleware('auth')