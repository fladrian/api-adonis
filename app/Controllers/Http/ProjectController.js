'use strict'

const Project = use('App/Models/Project')
const AuthService = use('App/Services/AuthService')

class ProjectController {
	async index({auth})
	{
		const user = await auth.getUser()
		return await user.projects().fetch()
	}

	async create({request,auth})
	{
		const user = await auth.getUser()
		const {name,body} = request.all()
		const project = new Project()
		project.fill({name,body})

		await user.projects().save(project)

		return project
	}

	async update({params,auth,request})
	{
		const {id} = params
		const {name,body} = request.all()
		const project = await Project.find(id)	
		const user = await auth.getUser()

		AuthService.validate(project,user)
		project.merge({name,body})
		await project.save()
		return {msj:`Project updated! ;D`}
	}

	async destroy({auth,params,response}){
		const {id} = params
		const user = await auth.getUser()
		const project = await Project.find(id)

		
		AuthService.validate(project,user)
		await project.delete()
		return project
		
	}

	async show({params,auth})
	{
		const {id} = params
		const user = await auth.getUser()
		//const post = await user.projects().where('id', id).fetch()
		const project = await Project.findBy('id', id)
		AuthService.validate(project,user)
		
		return project
	}
}

module.exports = ProjectController
