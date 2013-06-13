app = angular.module 'TechGrindApp.controllers', []

baseurl = 'http://dev-back1.techgrind.asia/'
restapi = baseurl+'scripts/rest.pike?request='
logindata = { "userid":"", "password":"" }

sTeam_get = (request, handler, http) ->
	headers = {}
	if logindata.userid
		headers = 
			headers:
				Authorization: 'Basic '+window.btoa(logindata.userid + ":" + logindata.password)
	http.get(restapi+request, headers).success(handler)

sTeam_post = (request, data, handler, http) ->
	headers = {}
	if logindata.userid
		headers = 
			headers:
				Authorization: 'Basic '+window.btoa(logindata.userid + ":" + logindata.password)
	http.post(restapi+request, data, headers).success(handler)

app.controller 'RegisterCtrl', ['$scope', '$location', '$http', (S, loc, http) ->
	S.registerdata = {}
	S.register = ->
		S.registerdata.group = 'techgrind'
		S.testname = S.registerdata.fullname.toLowerCase().replace(/[^a-z ]/g, "").trim().replace(/\s+/g, ".")
		S.registerdata.userid = S.testname
		S.data = S.testname
		sTeam_post('register', S.registerdata, handle_request, http)

	handle_request = (data, status) ->
		S.data = data
]

app.controller 'LoginCtrl', ['$scope', '$location', '$http', (S, loc, http) ->
	S.password = ""
	S.loginp = ->
		if logindata.userid && logindata.password
			true
	
	S.login = ->
		logindata.userid = S.userid
		logindata.password = S.password
		S.userid = ""
		S.password = ""
		sTeam_get('login', handle_request, http)

	handle_request = (data, status) ->
		S.data = data
		S.user = data.me

	sTeam_get('login', handle_request, http)
]

app.controller 'AppCtrl', ['$scope', '$location', (S, loc) ->
	S.active = (menuItem) -> if loc.path() == menuItem then 'active'
]

app.controller 'HomeCtrl', ['$scope', '$http', (S, http) ->
	http.get('/mock').success (data) -> S.mock = data
]

app.controller 'RegionsCtrl', ->
app.controller 'CalendarCtrl', ->

app.controller 'EventsCtrl', ['$scope', '$location', (S, loc) ->
	S.upcoming = [
		name: 'Speak.Learn.And.Pitch'
		abbr: 'SLAP'
		url: './_events/events_slap.html'
	,
		name: 'Find.A.Partner'
		abbr: 'FAP'
		url: './_events/events_fap.html'
	,
		name: 'Seed.Stars.World'
		abbr: 'SSW'
		url: './_events/events_ssw.html'
	]

	S.regional = [
		name: 'Mobile Monday Bangkok'
		abbr: 'MoMoBKK'
		url: 'http://momobkk.com/'
	,
		name: 'OpenCoffee Tech Meetup'
		abbr: 'OCT'
		url: 'http://www.meetup.com/bkk-startup/'
	,
		name: 'Bangkok Education Technology Meetup'
		abbr: 'BKK.EdTech'
		url: 'http://www.meetup.com/EdTech-Bangkok/'
	]

	S.past = [
		name: 'World.Startup.Report'
		abbr: 'WSR'
		url: './_events/wsr-bangkok.html'
	]

	S.showEvent = (event) -> loc.path event.url
]

app.controller 'ResourcesCtrl', ->
app.controller 'MediaCtrl', ->
app.controller 'PartnersCtrl', ->
