'use strict'
const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const AuthService = use('App/Services/AuthService')


class TaskController {

	async index({auth, params})
	{
		const {project_id} = params
		const user = await auth.getUser()
		const project = await Project.find(project_id)
		
		AuthService.validate(project,user)

		// const tasks = await Task.query()
		// 												.where('Project_id', project_id)
		// 												.fetch()
		// return tasks


		//Aqui estoy diciendo que por medio de las relaciones entre project(hasMany) y task(belongsTo) me traiga todas las tasks que pertenecen a ese project. 
		return await project.tasks().fetch()
		
	}

	async create({request,auth,params})
	{
		const user = await auth.getUser()
		const {title,description,done} = request.all()
		const {project_id} = params
		
		const project = await Project.find(project_id) 

		
		AuthService.validate(project,user)
		const task = await Task.create({project_id,title,description,done})
		//const task = new Task()
		//task.merge({project_id,title,description})
		await project.tasks().save(task)
		return {msj:'Task added',task}
		
	}

	async update({params,auth,request})
	{
		const {project_id,task_id} = params
		const task = await Task.find(task_id)	
		const project = await task.project().fetch()
		
		const user = await auth.getUser()
		AuthService.validate(project,user)

		task.merge(request.only([title,description,done]))
		await task.save()
		return {msj:`Task updated! ;D`,task}
	}

	async destroy({auth,params}){
		const {task_id} = params
		const user = await auth.getUser()
		//const project = await Project.find(project_id)

		const task = await Task.find(task_id)
		//Aqui estoy diciendo que me traiga el project(hasMany) al que pertenece esta task(belongsTo)
		const project = await task.project().fetch()
		

		AuthService.validate(project,user)
		await task.delete()
		return task
		
	}

	async show({params,auth})
	{
		const {project_id, task_id} = params
		const user = await auth.getUser()
		const project = await Project.find(project_id)
		
		AuthService.validate(project,user)

		const task = await Task.find(task_id)

		return task
	}

}

module.exports = TaskController
