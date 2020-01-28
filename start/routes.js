'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



Route.group(() => {
  /** RUTAS PARA OBTENER USUARIOS */
  Route.get('user', 'UserController.index')
  Route.get('user/:username', 'UserController.show').middleware('auth')
  Route.patch('user/:name','UserController.update').middleware('auth')
  Route.post('user/register', 'UserController.store')
  Route.post('user/login', 'UserController.login')

/** RUTAS PARA OBTENER PROYECTOS */
  Route.get('projects', 'ProjectController.index').middleware('auth')
  Route.post('projects/create', 'ProjectController.create').middleware('auth')
  Route.patch('projects/:id', 'ProjectController.update').middleware('auth')
  Route.get('projects/:id', 'ProjectController.show').middleware('auth')
  Route.delete('projects/:id', 'ProjectController.destroy').middleware('auth')


  /** RUTAS PARA OBTENER TAREAS */

  Route.get('projects/:project_id/tasks', 'TaskController.index').middleware('auth')
  Route.post('projects/:project_id/create-task', 'TaskController.create').middleware('auth')
  Route.get('projects/:project_id/task/:task_id', 'TaskController.show').middleware('auth')
  Route.patch('projects/:project_id/task/:task_id', 'TaskController.update').middleware('auth')
  Route.delete('projects/:project_id/task/:task_id', 'TaskController.destroy').middleware('auth')


}).prefix('api/v1')


