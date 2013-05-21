app = angular.module 'TechGrindApp.controllers', []

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
