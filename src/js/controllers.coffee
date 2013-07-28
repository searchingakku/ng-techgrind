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

	list_events_by_category = (category) ->
		console.log(sexp("list_events_by_category", category))
		mockevents.filter((item) -> item.category==category)

	S.events = list_events_by_category('event')
	S.workshops = list_events_by_category('workshop')
	S.conferences = list_events_by_category('conference')

	S.createactivity = [
		path: 'partials/createactivity.html'
	]

	S.past = [
		title: 'World.Startup.Report'
		abbr: 'WSR'
		path: '/events/wsr'
	]

	S.showEvent = (event) -> loc.path event.url
]

app.controller 'CreateactivityCtrl', ['$scope', '$http', '$location', '$routeParams', (S,http,loc,rp) ->
	S.rp = rp
	S.event =
		abbr: 'E.A.B.B.R.'
		title: 'Event Title'
		description: 'Event description'

	findevent = (name) ->
		console.log(sexp("findevent", name))
		mockevents.filter((item) -> 
			console.log(sexp(item, item.name, item.name==name))
			item.name==name)

	if rp.name
		console.log(sexp(rp))
		S.event = findevent(rp.name)[0]

	S.events = [
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
		S.comments.push(print: S.commenttext)
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
	S.profiles = [
		role: 'Directors'
		icon: 'icon-eye-open'
		type: 'directors'
	,
		role: 'Organizers'
		icon: 'icon-group'
		type: 'organizers'
	,
		role: 'Curators'
		icon: 'icon-thumbs-up'
		type: 'curators'
	]
	S.regiongetdetail = regiongetdetail()
	S.regionprofile={}
	S.findprofile = (rname) ->
		rname=rp.region
		for detail in S.regiongetdetail.directors
			console.log(sexp(item))
			if(detail.country==rname)
				return detail
	matchr = (detail) ->
		console.log(sexp("filter", detail.country==rp.region, detail.country, rp.region, detail))
		detail.country==rp.region

	if rp.region
		S.regionprofile.directors = S.regiongetdetail.directors.filter(matchr)
		S.regionprofile.organizers = S.regiongetdetail.organizers.filter(matchr)
		S.regionprofile.curators = S.regiongetdetail.curators.filter(matchr)
]

regiongetdetail = ->
		directors: [
			name: 'Nantaprong (House) Leelahongjudha'
			mail: 'th.house @ techgrind.asia'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
		,
			name: 'Karl Hoffman'
			mail: 'th.karl @ techgrind.asia'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
		,
			name: 'Efraim Pettersson'
			mail: 'th.efraim @ techgrind.asia'
			tags: 'developement'
			country: 'thailand'
			ownem: 'Naveen'
		,
			name: 'Juanita Sabapathy'
			mail: 'sg.juanita @ techgrind.asia'
			tags: 'developement'
			country: 'singapore'
			owner: 'Naveen'
		,
			name: 'Martin Bähr'
			mail: 'cn.martin @ techgrind.asia'
			tags: 'developement'
			country: 'china'
			owner: 'Naveen'
		,

		],
		organizers: [
			name: 'Herman Tamas'
			mail: 'cn.tamas @ techgrind.asia'
			month: 'june'
			tags: 'developement'
			country: 'china'
			owner: 'Naveen'
		,
			name: 'Worawut SaibuaWorawut Saibua'
			mail: 'th.worawut @ techgrind.asia'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			icon: ''
		,
			name: 'Philippe Dacquet'
			mail: 'th.philippe @ techgrind.asia'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			icon: ''
		],
		curators: [
			name: 'Bie Eadtevongsai'
			mail: 'th.bie @ techgrind.asia'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			icon: ''
			title: 'Coming soon '
			content: 'wait'
		,
			name: ' Join Us!'
			mail: 'contact @ techgrind.asia'
			month: 'june'
			tags: 'developement'
			country: 'china'
			owner: 'Naveen'
			icon: ''
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
			articlename: 'yo'
			content: 'content1'
			country: 'thailand'
		,
			title: 'Event2'
			content: 'content2'
			country: 'singapore'
		],
		calendar: [
			title: 'Coming soon '
			content: 'wait'
			country: 'india'
			articlename: 'bye'
		]


	mockevents = [
		title: 'Get.A.Partner'
		abbr: 'GAP'
		description: 'Find your cofounders - partners - and hires!'
		path: '/events/gap'
		name: 'gap'
		category: 'event'
	,
		title: 'Interview'
		abbr: 'INTRVU'
		description: 'Learn about building businesses from successful entrepreneurs'
		path: '/events/intrvu'
		name: 'intrvu'
		category: 'event'
	,
		title: 'Mobile Monday Bangkok'
		abbr: 'MoMoBKK'
		description: 'See all the latest mobile tech and trends!'
		path: '/events/momobkk'
		name: 'momobkk'
		category: 'event'
	,
		title: 'Slap.Learn.And.Pitch'
		abbr: 'SLAP'
		description: 'find your cofounders - partners - hires!'
		path: '/events/slap'
		name: 'slap'
		category: 'workshop'
	,
		title: 'Coding.For.Fun'
		abbr: 'CFF'
		description: 'come learn to code something new'
		path: '/events/cff'
		name: 'cff'
		category: 'workshop'
	,
		title: 'Citech.Hacker.Space.Party'
		abbr: 'CITEC.HSP'
		description: 'learn to hack apart and build hardware'
		path: '/events/citec'
		name: 'citec'
		category: 'workshop'
	,
		place: 'Singapore'
		owner: 'Startup Asia'
		description : 'TechInAsias hallmark tech conference'
		path: '/events/startup-asia'
		name: 'startup-asia'
		category: 'conference'
	,
		place: 'Singapore'
		owner: 'Echelon'
		description: 'e27s hallmark tech conference'
		path: '/events/echelon'
		name: 'echelon'
		category: 'conference'
	,
		owner: 'GDCThailand'
		place: 'Bangkok Thailand'
		description: 'TechGrinds Game Developer Conference Thailand'
		path: '/events/gdc-thailand'
		name: 'gdc-thailand'
		category: 'conference'
	]
