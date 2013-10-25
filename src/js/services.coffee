###
# /*
# 	File: <name>
# 		Define file purpose: "What does this file do??? Why does it exist???"
# 
# 	Class: <name>
# 		Is this a class/object? Define its purpose: its "persona" or "role"
# 		Define its structure: what data elements, methods, etc does it need?
# 
# 	Function: <name>
# 		Is this a function? Define its purpose.
# 		Here's an example, lets say its a multiply function...
# 		Parameters/Inputs:
# 			x - The first integer.
# 		 	y - The second integer.
# 		Returns/Outputs:
# 		 	The two integers multiplied together.
# 		Example/Usage:
# 			var x = <functionName>(a,b);
# 			input.print tostring(x);
# 		 
# 	See Also:
#  		links? another file? function? webpage tutorial?
# 		anything else that can help me understand this file overall? 
# */
###

services = angular.module 'TechGrindApp.services', []
services.value 'version', '0.1'

services.factory 'steam', ($http, localStorageService) ->
	baseurl = 'http://dev-back1.techgrind.asia/'
	restapi = baseurl+'scripts/rest.pike?request='

	handle_request = (response) ->
		localStorageService.add('user', JSON.stringify(response.data.me))
		console.log(sexpr("steam-service", "response", response))
		response.data
	
	loginp = ->
		logindata = JSON.parse(localStorageService.get('logindata'))
		user = JSON.parse(localStorageService.get('user'))
		logindata and user and user.id and user.id != "guest"

	headers = (login) ->
		logindata = JSON.parse(localStorageService.get('logindata'))
		if loginp() or (login and logindata)
			headers: logindata
		else
			{}

	login: (userid, password) ->
		console.log(sexpr("steam-service", "login:", userid, password))
		if userid != "" and password != ""
			localStorageService.add('logindata', JSON.stringify(Authorization: 'Basic '+window.btoa(userid + ":" + password)))
			$http.get(restapi+"login", headers(true)).then(handle_request)

	logout: ->
		localStorageService.remove('logindata')
		localStorageService.remove('user')
		$http.get(restapi+"login", headers()).then(handle_request)

	loginp: loginp

	user: ->
		if loginp()
			JSON.parse(localStorageService.get('user'))

	get: (request) ->
		console.log(sexpr("steam-service", "GET", request))
		$http.get(restapi+request, headers()).then(handle_request)

	post: (request, data) ->
		console.log(sexpr("steam-service", "POST", request, data))
		$http.post(restapi+request, data, headers()).then(handle_request)

	put: (request, data) ->
		console.log(sexpr("steam-service", "PUT", request, data))
		$http.put(restapi+request, data, headers()).then(handle_request)
