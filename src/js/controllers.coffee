app = angular.module 'TechGrindApp.controllers', []

app.run(['$rootScope', (root) ->
	root.sexpr = sexpr
])


app.controller 'RegisterCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.registerdata = {}
	S.register = ->
		S.registerdata.group = 'techgrind'
		S.testname = S.registerdata.fullname.toLowerCase().replace(/[^a-z ]/g, "").trim().replace(/\s+/g, ".")
		S.registerdata.userid = S.testname
		S.data = S.testname
		steam.post('register', S.registerdata).then(handle_request)

	handle_request = (data) ->
		S.data = data
]

app.controller 'LoginCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.password = ""
	S.loginp = steam.loginp
	S.logout = steam.logout

	S.login = ->
		steam.login(S.userid, S.password).then(handle_request)

	handle_request = (data) ->
		S.data = data
		S.user = data.me
		console.log(sexpr(S.user))

	steam.get('login').then(handle_request)
]

app.controller 'ActivationCtrl', ['$scope', '$routeParams', 'steam', (S, rp, steam) ->
	handle_activation = (data,status) ->
		S.activation = data.result
		S.error = data.error
		S.data = data
	activationdata =
		activate: rp.activationcode
		userid: rp.userid
	steam.post('activate', activationdata).then(handle_activation)
]


app.controller 'AppCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.active = (menuItem) -> if loc.path() == menuItem then 'active'

	handle_request = (data) ->
		S.data = data
		S.user = data.me

	steam.get('login').then(handle_request)
]

app.controller 'HomeCtrl', ['$scope', '$http', (S, http) ->
	http.get('/mock').success (data) -> S.mock = data
]

app.controller 'RegionsCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
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
		console.log(sexpr("list_events_by_category", category))
		mockevents.filter((item) -> item.category==category)

	S.events = list_events_by_category('event')
	S.workshops = list_events_by_category('workshop')
	S.conferences = list_events_by_category('conference')

	S.createactivity = [
		path: 'partials/createactivity.html'
	]

	S.past = [
		title: 'World.Startup.Report'
		name: 'WSR'
		path: '/events/wsr'
	]


	S.showEvent = (event) -> loc.path event.url
]

app.controller 'CreateactivityCtrl', ['$scope', 'steam', '$location', '$routeParams', (S,steam,loc,rp) ->
	S.rp = rp
	S.user = steam.user
	S.event =
		name: 'SHORT-NAME'
		title: 'Event Title'
		description: 'Event description'
		events: []

	findevent = (name) ->
		console.log(sexpr("findevent", name))
		mockevents.filter((item) -> 
			console.log(sexpr(item, item.name, item.name==name))
			item.name==name)

	if rp.name
		console.log(sexpr(rp))
		S.event = findevent(rp.name)[0]

	S.addEvent = ->
		console.log("adding event")
		event = 
			place1: S.insertplace1
			place2: S.insertplace2
			date: S.insertdate
			time: S.inserttime
			source: S.insertsource
		S.event.events.push(event)
		S.insertplace1 = ""
		S.insertplace2 = ""
		S.insertdate = ""
		S.inserttime= ""
		S.insertsource = ""

	S.submit_event = ->
		console.log(sexpr("submit_event", S.event))
		steam.put('techgrind.events', S.event).then(handle_event)

	handle_event = (data) ->
		S.data = data
		console.log(sexpr("handle_event", data))

#		steam.post('event', event).then(handle_event)
#
#	S.create_eventtype = ->
#		handle_eventtype = -> (data) ->
#			S.data = data
#			S.eventtype = data.eventtype
#		steam.post('eventtype', S.eventtype).then(handle_eventtype)

]

app.controller 'ResourcesCtrl', ->
app.controller 'MediaCtrl', ->
app.controller 'PartnersCtrl', ->

app.controller 'TestCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->

	handle_request = (data) ->
		S.data = data
		S.user = data.me

	steam.get('delete').then(handle_request)
	steam.get('login').then(handle_request)
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
			console.log(sexpr(item))
			if(item.articlename==name)
				return item

	if rp.articlename
		S.article = S.findarticle(rp.articlename)

	S.find = (regionname) ->
		regionname=rp.region
		for item in S.getblog.articles
			console.log(sexpr(item))
			if(item.country==regionname)
				return item

	matchregion = (item) ->
		console.log(sexpr("filter", item.country==rp.region, item.country, rp.region, item))
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
			console.log(sexpr(item))
			if(detail.country==rname)
				return detail
	matchr = (detail) ->
		console.log(sexpr("filter", detail.country==rp.region, detail.country, rp.region, detail))
		detail.country==rp.region

	if rp.region
		S.regionprofile.directors = S.regiongetdetail.directors.filter(matchr)
		S.regionprofile.organizers = S.regiongetdetail.organizers.filter(matchr)
		S.regionprofile.curators = S.regiongetdetail.curators.filter(matchr)

	S.list1 = [
		name: 'News'
	,
		name: 'Articles'
	]
	S.list2 = []
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
		name: 'GAP'
		description: 'Find your cofounders - partners - and hires!'
		path: '/events/gap'
		name: 'gap'
		category: 'event'
	,
		title: 'Interview'
		name: 'INTRVU'
		description: 'Learn about building businesses from successful entrepreneurs'
		path: '/events/intrvu'
		name: 'intrvu'
		category: 'event'
	,
		title: 'Mobile Monday Bangkok'
		name: 'MoMoBKK'
		description: 'See all the latest mobile tech and trends!'
		path: '/events/momobkk'
		name: 'momobkk'
		category: 'event'
	,
		title: 'Slap.Learn.And.Pitch'
		name: 'SLAP'
		description: 'find your cofounders - partners - hires!'
		path: '/events/slap'
		name: 'slap'
		category: 'workshop'
	,
		title: 'Coding.For.Fun'
		name: 'CFF'
		description: 'come learn to code something new'
		path: '/events/cff'
		name: 'cff'
		category: 'workshop'
	,
		title: 'Citech.Hacker.Space.Party'
		name: 'CITEC-HSP'
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
