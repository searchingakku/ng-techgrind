app = angular.module 'TechGrindApp.controllers', []

app.run(['$rootScope', (root) ->
	root.sexpr = sexpr
])


app.controller 'RegisterCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.registerdata = {}
	S.passwordmatch = true
	tested_users = {}
	S.tested_users = () ->
		tested_users
	S.user_checking = ->
		S.registerdata.userid and typeof tested_users[S.registerdata.userid] == 'undefined'
	S.user_available = ->
		typeof tested_users[S.registerdata.userid] != 'undefined' and !tested_users[S.registerdata.userid]
	S.user_taken = ->
		typeof tested_users[S.registerdata.userid] != 'undefined' and tested_users[S.registerdata.userid]

	S.register = ->
		S.registerdata.group = 'techgrind'
		steam.post('register', S.registerdata).then(handle_request)

	handle_request = (data) ->
		S.data = data

	S.$watch('[registerdata.password, registerdata.password2]', ->
		if S.registerdata.password and S.registerdata.password2 and S.registerdata.password != S.registerdata.password2
			S.passwordmatch = false
		else
			S.passwordmatch = true
	true)

	S.$watch('registerdata.fullname', ->
		count = 0
		if S.registerdata.fullname
			S.testname = S.registerdata.fullname.toLowerCase().replace(/[^a-z ]/g, "").trim().replace(/\s+/g, ".")
		S.registerdata.userid = S.testname

		handle_user = (data) ->
			console.log(sexpr("user-result", data))
			if data.error == "request not found"
				tested_users[data.request] = false
			else
				count++
				tested_users[data.request] = true
				if data.request==S.registerdata.userid
					S.registerdata.userid = S.testname+"."+count
					steam.get(S.registerdata.userid).then(handle_user)
		if S.registerdata.userid
			steam.get(S.registerdata.userid).then(handle_user))

	S.$watch('registerdata.userid', ->
		handle_user = (data) ->
			console.log(sexpr("userid-result", data))
			if data.error == "request not found"
				tested_users[data.request] = false
			else
				tested_users[data.request] = true
		if S.registerdata.userid
			steam.get(S.registerdata.userid).then(handle_user))
]

app.controller 'LoginCtrl', ['$scope', '$location', '$routeParams', 'steam', (S, loc, rp, steam) ->
	S.username = ""
	S.password = ""

	if rp.userid
		S.userid = rp.userid

	S.loginp = steam.loginp
	S.user = steam.user
	S.logout = ->
		steam.logout().then(handle_request)

	S.login = ->
		console.log(sexpr("LoginCtrl", S.userid, S.password))
		steam.login(S.userid, S.password).then(handle_request)
		S.userid = ""
		S.password = ""

	handle_request = (data) ->
		S.data = data
		console.log(sexpr("LoginCtrl", "handle_request", S.user(), data))

	steam.get('login').then(handle_request)
]

app.controller 'ActivationCtrl', ['$scope', '$routeParams', 'steam', (S, rp, steam) ->
	handle_activation = (data) ->
		if data.result == "user is activated"
			S.activation = "activated"
		else if data.error == "user already activated"
			S.activation = "active"
		else
			S.activation = "failed"
		S.userid = rp.userid
		S.error = data.error
		S.data = data
	activationdata =
		activate: rp.activationcode
		userid: rp.userid
	steam.post('activate', activationdata).then(handle_activation)
]


app.controller 'AppCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.active = (menuItem) -> if loc.path() == menuItem then 'active'
	S.user = steam.user
	S.loginp = steam.loginp
	S.logout = steam.logout
	S.data = {}

	handle_request = (data) ->
		S.data = data

	steam.get('login').then(handle_request)
]

app.controller 'HomeCtrl', ['$scope', '$http', (S, http) ->
	http.get('/mock').success (data) -> S.mock = data
	S.getblog = getblog()
]

app.controller 'RegionsCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.countries = [
		name: 'Cambodia'
		url: 'cambodia'
	,
		name: 'China'
		url: 'china'
	,
		name: 'Malaysia'
		url: 'malaysia'
	,
		name: 'Philippines'
		url: 'philippines'
	,
		name: 'Singapore'
		url : 'singapore'
	,
		name: 'Thailand'
		url: 'thailand'
	,
		name: 'Vietnam'
		url: 'vietnam'
	]
]

app.controller 'CalendarCtrl', ->

app.controller 'EventsCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->

	S.events = {}
	allevents = []
	list_events_by_category = (category) ->
		S.events[category] = allevents.filter((item) -> item.category==category)
		console.log(sexpr("list_events_by_category", category, S.events))

	get_events = (data) ->
		S.data = data
		allevents = data.events
		list_events_by_category('event')
		list_events_by_category('workshop')
		list_events_by_category('conference')

	steam.get('techgrind.events').then(get_events)

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

	S.categories = categories

	handle_event = (data) ->
		S.data = data
		S.event = data.event
		console.log(sexpr("handle_event", data))

	if rp.name
		console.log(sexpr("rp.name", rp))
		steam.get('techgrind.events.'+rp.name).then(handle_event)
	else
		S.event =
			name: 'SHORT-NAME'
			title: 'Event Title'
			description: 'Event description'
			events: []

	S.submit_event = ->
		console.log(sexpr("submit_event", S.event))
		if S.event.eventid
			steam.post(S.event.eventid, S.event).then(handle_event)
		else
			steam.put('techgrind.events', S.event).then(handle_event)

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

	S.user = steam.user
	handle_request = (data) ->
		S.data = data

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
		title: 'Articles'
	,
		title: 'Events'
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
		role: 'Volunteers'
		icon: 'icon-group'
		type: 'volunteers'
	]
	S.regiongetdetail = regiongetdetail()
	S.regionprofile={}
	S.findprofile = (rname) ->
		rname=rp.region
		for detail in S.regiongetdetail.volunteers
			console.log(sexpr(item))
			if(detail.country==rname)
				return detail
	matchr = (detail) ->
		console.log(sexpr("filter", detail.country==rp.region, detail.country, rp.region, detail))
		detail.country==rp.region

	if rp.region
		S.regionprofile.volunteers = S.regiongetdetail.volunteers.filter(matchr)

	S.rendercal = () ->
		$('#calendar').fullCalendar('render');
		console.log(sexpr("cal-tab-selected"))

	S.list1 = [
		name: 'News'
	,
		name: 'Articles'
	]
	S.list2 = []
]

app.controller 'ContentPageCtrl', ['$scope', '$location', '$routeParams', (S, loc, rp)  ->
	S.addComment = -> 
		S.chatterbox.push(S.commenttext);
		S.commenttext="";
]

regiongetdetail = ->
		volunteers: [
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
			name: 'Herman Tamas'
			mail: 'cn.tamas @ techgrind.asia'
			month: 'june'
			tags: 'developement'
			country: 'china'
			owner: 'Naveen'
		,
			name: 'Worawut Saibua'
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
		,
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
categories = 
	[ 
		name:'event'
	, 
		name:'workshop'
	,
		name:'conference'
	]
