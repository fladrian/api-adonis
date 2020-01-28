const InvalidAccess = use('App/Exceptions/InvalidRequestException')
const ResourceNotFound = use('App/Exceptions/ResourceNotFoundException')

class AuthService
{
	validate(resource,user)
	{
		if(!resource)
		{
			throw new ResourceNotFound()
		}
		if(resource.user_id !== user.id)
		{
			throw new InvalidAccess()
		}
	}
	
}

module.exports = new AuthService()