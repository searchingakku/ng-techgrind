services = angular.module 'TechGrindApp.services', []
services.value 'version', '0.1'

services.factory 'steam', ($http, localStorageService) ->
	baseurl = 'http://dev-back1.techgrind.asia/'
	restapi = baseurl+'scripts/rest.pike?request='

	handle_request = (response) ->
		localStorageService.add('user', JSON.stringify(response.data.me))
		console.log(sexpr("steam-service", "response", response))
		response.data

	login_handler = (data, status) ->
		localStorageService.add('user', JSON.stringify(data.me))
		console.log(sexpr(data))

	headers = ->
		logindata = JSON.parse(localStorageService.get('logindata'))
		if logindata
			headers: logindata
		else
			{}

	login: (userid, password) ->
		localStorageService.add('logindata', JSON.stringify(Authorization: 'Basic '+window.btoa(userid + ":" + password)))
		this.get('login')

	logout: ->
		localStorageService.remove('logindata')
		localStorageService.remove('user')
		this.get('login', login_handler)

	loginp: ->
		user = JSON.parse(localStorageService.get('user'))
		user and user.id and user.id != "guest"

	user: ->
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
