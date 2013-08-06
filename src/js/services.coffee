services = angular.module 'TechGrindApp.services', []
services.value 'version', '0.1'

services.factory 'steam', ($http) ->
	baseurl = 'http://dev-back1.techgrind.asia/'
	restapi = baseurl+'scripts/rest.pike?request='

	logindata = {}
	user = {}

	handle_request = (response) ->
		user = response.data.me
		console.log(sexp("steam-service", "response", response))
		response.data

	login_handler = (data, status) ->
		user = data.me
		console.log(sexp(data))

	login: (userid, password) ->
		logindata =
			Authorization: 'Basic '+window.btoa(userid + ":" + password)
		this.get('login')

	logout: ->
		logindata = {}
		this.get('login', login_handler)

	loginp: ->
		user and user.id != "guest"

	user: ->
		user

	get: (request) ->
		console.log(sexp("steam-service", "GET", logindata, request))
		headers = {}
		if logindata
			headers =
				headers: logindata
		$http.get(restapi+request, headers).then(handle_request)

	post: (request, data) ->
		headers = {}
		console.log(sexp("steam-service", "POST", logindata, request, data))
		if logindata
			headers =
				headers: logindata
		$http.post(restapi+request, data, headers).then(handle_request)

	put: (request, data) ->
		console.log(sexp("steam-service", "PUT", logindata, request, data))
		headers = {}
		if logindata
			headers =
				headers: logindata
		$http.put(restapi+request, data, headers).then(handle_request)
