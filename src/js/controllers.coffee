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

app.run(['$rootScope', (root) ->
	root.sexp = sexp
])

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
		if S.user and S.user.id != "guest"
			true

	S.logout = ->
		logindata.userid = ""
		logindata.password = ""
		sTeam_get('login', handle_request, http)

	S.login = ->
		logindata.userid = S.userid
		logindata.password = S.password
		S.userid = ""
		S.password = ""
		sTeam_get('login', handle_request, http)

	handle_request = (data, status) ->
		S.data = data
		S.user = data.me
		console.log(sexp(S.user))

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


app.controller 'AppCtrl', ['$scope', '$location', '$http', (S, loc, http) ->
	S.active = (menuItem) -> if loc.path() == menuItem then 'active'

	handle_request = (data, status) ->
		S.data = data
		S.user = data.me

	sTeam_get('login', handle_request, http)
]

app.controller 'HomeCtrl', ['$scope', '$http', (S, http) ->
	http.get('/mock').success (data) -> S.mock = data
]

app.controller 'RegionsCtrl', ['$scope', '$location', '$http', (S, loc, http) ->
	S.countries = [
		name: 'Thailand'
		url: 'thailand'
	,
		name: 'Singapore'
		url : 'singapore'
	,
		name: 'India'
		url: 'india'
	]
]

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
	S.event =
		abbr: 'C.L.H.F'
		title: 'COME LEARN AND HAVE FUN'
		description: 'Media queries allow for custom CSS based on a number of conditions—ratios, widths, display type, etc—but usually focuses around min-width and max-width.
Modify the width of column in our grid
Stack elements instead of float wherever necessary    Resize headings and text to be more appropriate for devices

Use media queries responsibly and only as a start to your mobile audiences. For larger projects, do consider dedicated code bases and not layers of media queries. .data-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This is awesome because it eliminates DOM manipulation from the list of things you have to worry about.'

	S.events = [
		place1: 'singapore'
		place2:	'singapore'
		date: '20 june'
		time: '12:00'
		source: 'ekita'
	]
	S.addEvent = ->
		console.log("adding event")
		event = 
			place1: S.insertplace1
			place2: S.insertplace2
			date: S.insertdate
			time: S.inserttime
			source: S.insertsource
		S.events.push(event)
		S.insertplace1 = ""
		S.insertplace2 = ""
		S.insertdate = ""
		S.inserttime= ""
		S.insertsource = ""
]
#		handle_event = -> (data, status) ->
#			S.data = data
#		sTeam_post('event', event, handle_event, http)
#
#	S.create_eventtype = ->
#		handle_eventtype = -> (data, status) ->
#			S.data = data
#			S.eventtype = data.eventtype
#		sTeam_post('eventtype', S.eventtype, handle_eventtype, http)


app.controller 'ResourcesCtrl', ->
app.controller 'MediaCtrl', ->
app.controller 'PartnersCtrl', ->

app.controller 'TestCtrl', ['$scope', '$location', '$http', (S, loc, http) ->

	handle_request = (data, status) ->
		S.data = data
		S.user = data.me

	sTeam_get('delete', handle_request, http)
	sTeam_get('login', handle_request, http)
]

app.controller 'ContentCtrl', ['$scope', '$route', '$location', '$routeParams', (S, r, loc, rp)  ->
	S.loc = loc
	S.rp = rp
	S.articlename=rp.articlename
	S.day = rp.day
	S.month = rp.month
	S.content = rp.content
	S.tabs = [
		title: 'articles'
	,
		title: 'events'
	,
		title: 'calender'
	]

	S.getblog = getblog()

	S.regionblog = {}
	S.chatterbox = []
	S.addComment = -> 
		S.chatterbox.push(S.commenttext);
		S.commenttext="";

	S.findarticle =(name) ->
		name=rp.articlename
		for item in S.getblog.articles
			console.log(sexp(item))
			if(item.articlename==name)
				return item

	if rp.articlename
		S.article = S.findarticle(rp.articlename)

	S.find = (regionname) ->
		regionname=rp.region
		for item in S.getblog.articles
			console.log(sexp(item))
			if(item.country==regionname)
				return item

	matchregion = (item) ->
		console.log(sexp("filter", item.country==rp.region, item.country, rp.region, item))
		item.country==rp.region

	if rp.region
		S.regionblog.articles = S.getblog.articles.filter(matchregion)
		S.regionblog.events = S.getblog.events.filter(matchregion)
		S.regionblog.calendar = S.getblog.calendar.filter(matchregion)
]

app.controller 'RegionContentCtrl', ['$scope', '$location', '$routeParams', (S, loc, rp) ->
	S.directors = [
		name : 'Nantaprong (House) Leelahongjudha'
		mail : 'th.house @ techgrind.asia'
	,
		name : 'Karl Hoffman'
		mail : 'th.karl @ techgrind.asia'
	,
		name : 'Efraim Pettersson'
		mail : 'th.efraim @ techgrind.asia'
	]
]

app.controller 'ContentPageCtrl', ['$scope', '$location', '$routeParams', (S, loc, rp)  ->
	S.addComment = -> 
		S.chatterbox.push(S.commenttext);
		S.commenttext="";
]


getblog = ->
		articles: [
			title: 'how to use ng-bind-html-safe'
			day: '20'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			articlename: 'how-to-use-ng-bind-html-safe'
			tab: 'articles'

			content: 'reates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive and when you absolutely trust the source of the content you are binding to.'
		,
			title: 'Article2'
			day: '7'
			month: 'july'
			content: 'content2'
			country: 'india'
			tab: 'articles'
			articlename: 'Article2'
			url: 'articles/Article2'
		],
		events: [
			title: 'Event1'
			content: 'content1'
		,
			title: 'Event2'
			content: 'content2'
		],
		calendar: [
			title: 'Coming soon '
			content: 'wait'
		]
