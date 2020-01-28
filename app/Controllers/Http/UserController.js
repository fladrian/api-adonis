'use strict'

const User = use('App/Models/User')
const DB = use('Database')

class UserController
{

	async login({request, auth})
	{
		const {email,password} = request.all()
		const token = await auth.attempt(email,password)

		return token
	}

	async index()
	{
		return await User.all()
	}

	async store({request})
	{
		// const {email,username,password} = request.all()
		// const user = await User.create({
		// 	username,
		// 	email,
		// 	password
		// })

		//const userData = request.only(['username','email','password'])
		//const user = await User.create(userData)

		await User.create(request.only(['username','email','password']))

		return this.login(...arguments)

		
		
	}

	async show({params, auth, response}){

		const {username} = await params
		console.info(username)
		//const username = await request.only(['username'])
		const user = await auth.getUser()

		//const userData = await DB.table('users').where('username', username).first()
		
		const thisuser = await User.findBy('username',username)
		if(thisuser.id !== user.id){
			return response.status(403).json({
				msj:`You're not ${username}`
			})
		}
		
		console.info(thisuser)
		return thisuser
		
	}
	
	async update({params,request,auth}){

		const {name} = await params
		const {username,email} = await request.all()
		const user = await auth.getUser()
		user.merge({username,email})
		console.info(user)
		await user.save()

		//await User
			//			.query()
			//			.where('username',name)
			//			.update({username,email})

		//const userData = await DB.table('users').where('username', name).update({username,email})
	
		return {msj:'User updated! :D', user}
	}

}

module.exports = UserController
