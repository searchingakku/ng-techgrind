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

app.controller 'ActivationCtrl', ['$scope', '$routeParams', '$http', (S, rp, http) ->
	handle_activation = (data,status) ->
		S.activation = data.result
		S.error = data.error
		S.data = data
	activationdata =
		activate: rp.activationcode
		userid: rp.userid
	sTeam_post('activate', activationdata, handle_activation, http)
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
	S.events = [
		name: 'Get.A.Partner'
		abbr: 'GAP'
		desc: 'Find your cofounders - partners - and hires!'
		url: './_events/events_gap.html'
	,
		name: 'Interview'
		abbr: 'INTRVU'
		desc: 'Learn about building businesses from successful entrepreneurs'
		url: './_events/events_intrvu.html'
	,
		name: 'Mobile Monday Bangkok'
		abbr: 'MoMoBKK'
		desc: 'See all the latest mobile tech and trends!'
		url: 'http://momobkk.com/'
	]

	S.workshops = [
		name: 'Slap.Learn.And.Pitch'
		abbr: 'SLAP'
		desc: 'find your cofounders - partners - hires!'
		url: './_events/events_slap.html'
	,
		name: 'Coding.For.Fun'
		abbr: 'CFF'
		desc: 'come learn to code something new'
		url: './_events/events_cff.html'
	,
		name: 'Citech.Hacker.Space.Party'
		abbr: 'CITEC.HSP'
		desc: 'learn to hack apart and build hardware'
		url: './_events/events_citec.html'
	]

	S.conferences = [
		place: 'Singapore'
		owner: 'Startup Asia'
		desc : 'TechInAsias hallmark tech conference'
		url: ''
	,
		place: 'Singapore'
		owner: 'Echelon'
		desc: 'e27s hallmark tech conference'
		url: ''
	,
		owner: 'GDCThailand'
		place: 'Bangkok Thailand'
		desc: 'TechGrinds Game Developer Conference Thailand'
		url: ''
	]

	S.createactivity = [
		url: 'partials/createactivity.html'
	]

	S.past = [
		name: 'World.Startup.Report'
		abbr: 'WSR'
		url: './_events/wsr-bangkok.html'
	]

	S.showEvent = (event) -> loc.path event.url
]

app.controller 'CreateactivityCtrl', ['$scope', '$http', '$location', (S,http,loc) ->
	S.changeable = [
		title: 'Activity abbr'
	,
		title: 'Activity Full-Name'
	]	

	S.details = [
		desc: 'ta-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This is awesome because it eliminates DOM manipulation from the list of things you have to worry about.'
	]
		
	S.events = [
		place1: 'singapore'
		place2:	'singapore'
		date: '20 june'
		time: '12:00'
		source: 'ekita'
	]
	S.addEvent = ->
		console.log("adding event")
		S.events.push( 
			place1: S.insertplace1
			place2: S.insertplace2
			date: S.insertdate
			time: S.inserttime
			source: S.insertsource
			)		
]

app.controller 'ResourcesCtrl', ->
app.controller 'MediaCtrl', ->
app.controller 'PartnersCtrl', ->
