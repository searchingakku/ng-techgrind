###
# 
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
# 
###

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
	http.get('https://graph.facebook.com/153371304826505/feed?limit=5&access_token=CAACEdEose0cBAOGDpUGu6jvFBkuibxGrHEPEgvDkVEPaomUw1FPMjRbJ408vNYsWiiUSyCfDx3C9cxtM22eph3aokhHc0L02JzwKPnldUN1T3SZBuuTtGI582ahKDgGivN421JINwiygtQGZA62Owc7rlpiPR8cNZA1QZCjeuYcMAMsW8NjYgLbuJrdIMPJgQlsHrmGOnwZDZD').success (data) -> S.facebookFeed = data
]

app.controller 'RegionsCtrl', ['$scope', '$location', 'steam', (S, loc, steam) ->
	S.countries = [
		name: 'Cambodia'
		url: 'cambodia'
	,
		name: 'China'
		url: 'china'
	,
		name: 'Indonesia'
		url: 'indonesia'
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
	];
]

app.controller 'ResourcesCtrl', ['$scope', '$location', (S, loc) ->
	S.resources = [
		name: 'Startup Jobs'
		url: 'resources/jobs'
		icon: 'icon-laptop'
	,
		name: 'Docs & Templates'
		url: 'resources/docs'
		icon: 'icon-file-text'
	,
		name: 'Guides & Tutorials'
		url: 'resources/tutorials'
		icon: 'icon-lightbulb'
	,
		name: 'Photos & Video'
		url: 'resources/media'
		icon: 'icon-film'
	,
		name: 'TeamSpeak Server'
		url: 'resources/teamspeak'
		icon: 'icon-group'
	];
]

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

app.controller 'PartnersCtrl', ->

app.controller 'StartupGenomeCtrl', ['$scope', '$routeParams', 'steam', (S, rp, steam) ->
	S.countries = {}
	S.sgenome = {}
	S.debug = []

	get_countries = (data) ->
		for country in data.inventory
			S.countries[country.name] = country

	get_country = (country, filter) ->
		S.debug.push = [ "getting", country, filter ]
		if filter
				filter = "/"+filter
		else
				filter = ""
		steam.get('/home/techgrind/organizations/country/'+country+filter).then((data) ->
				S.debug.push = "got "+country
				S.sgenome[country] = data
				)

	steam.get('/home/techgrind/organizations/country').then(get_countries)
	if rp.country
		get_country(rp.country, rp.filter)
]

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
		news: [
			title: 'How to Use ng-bind-html-safe'
			day: '20'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			articlename: 'how-to-use-ng-bind-html-safe'
			tab: 'news'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element The innerHTML-ed content'
			content: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive.'
		,
			title: 'SSW Winner Announced'
			day: '7'
			month: 'july'
			tags: 'developement'
			country: 'singaphore'
			owner: 'Naveen'
			articlename: 'ssw-winner-announced'
			tab: 'news'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European'
			content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.'
			url: 'news/article2'
		,
			title: 'Fashion Incubator Looking for Talent'
			day: '9'
			month: 'May'
			tags: 'developement'
			country: 'viewtnam'
			owner: 'Naveen'
			articlename: 'fashion-incubator'
			tab: 'news'

			rate: 2
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs'
			content: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs are looking to help you do just that!'
		,
			title: 'Founder Equity Calculator'
			day: '8'
			month: 'May'
			tags: 'developement'
			country: 'india'
			owner: 'Naveen'
			articlename: 'founder-equity-calculator'
			tab: 'news'

			rate: 4
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator'
			content: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator that was presented at TechGrind Co-founder dating event in April.'
		,
			title: 'TG Monthly Enter Singaphore'
			day: '2'
			month: 'May'
			tags: 'developement'
			country: 'singaphore'
			owner: 'Naveen'
			articlename: 'tg-monthly-enter-singaphore'
			tab: 'news'

			rate: 1
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community'
			content: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community supportive of eachother --- get on over to Hackerspace.SG this Saturday, May 4th!!!'
		,
			title: 'FAP.BKK#1, WSR, a very busy week!'
			day: '27'
			month: 'April'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			articlename: 'fap-bkk-very-busy-work'
			tab: 'news'

			rate: 4
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Thank-you everyone for a great week full of events! This last week was incredibly busy and productive for Bangkok startups.'
			content: 'Thank-you everyone for a great week full of events! This last week was incredibly busy and productive for Bangkok startups. Thanks to all who contributed and helped make TechGrind explode onto the scene with such success.'
		,
			title: 'Fashion Incubator Looking for Talent'
			day: '9'
			month: 'May'
			tags: 'developement'
			country: 'viewtnam'
			owner: 'Naveen'
			articlename: 'fashion-incubator'
			tab: 'articles'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs'
			content: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs are looking to help you do just that!'
		,
			title: 'How to Use ng-bind-html-safe'
			day: '20'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			articlename: 'how-to-use-ng-bind-html-safe'
			tab: 'news'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content'
			content: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive.'
		,
			title: 'TG Monthly Enter Singaphore'
			day: '2'
			month: 'May'
			tags: 'developement'
			country: 'singaphore'
			owner: 'Naveen'
			articlename: 'tg-monthly-enter-singaphore'
			tab: 'news'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community'
			content: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community supportive of eachother --- get on over to Hackerspace.SG this Saturday, May 4th!!!'
		],
		articles: [
			title: 'How to Use ng-bind-html-safe'
			day: '20'
			month: 'june'
			tags: 'developement'
			country: 'thailand'
			owner: 'Naveen'
			articlename: 'how-to-use-ng-bind-html-safe'
			tab: 'articles'

			rate: 5
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized!'
			content: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive.'
		,
			title: 'SSW Winner Announced'
			day: '7'
			month: 'july'
			tags: 'developement'
			country: 'singaphore'
			owner: 'Naveen'
			articlename: 'ssw-winner-announced'
			tab: 'articles'

			rate: 1
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor'
			content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.'
			url: 'articles/article2'
		,
			title: 'Fashion Incubator Looking for Talent'
			day: '9'
			month: 'May'
			tags: 'developement'
			country: 'viewtnam'
			owner: 'Naveen'
			articlename: 'fashion-incubator'
			tab: 'articles'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs'
			content: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs are looking to help you do just that!'
		,
			title: 'Founder Equity Calculator'
			day: '8'
			month: 'May'
			tags: 'developement'
			country: 'india'
			owner: 'Naveen'
			articlename: 'founder-equity-calculator'
			tab: 'articles'

			rate: 4
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator'
			content: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator that was presented at TechGrind Co-founder dating event in April.'
		,
			title: 'TG Monthly Enter Singaphore'
			day: '2'
			month: 'May'
			tags: 'developement'
			country: 'singaphore'
			owner: 'Naveen'
			articlename: 'tg-monthly-enter-singaphore'
			tab: 'articles'

			rate: 2
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community'
			content: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community supportive of eachother --- get on over to Hackerspace.SG this Saturday, May 4th!!!'
		],
		activities: [
			title: 'SSW Winner Announced'
			day: '7'
			month: 'july'
			tags: 'developement'
			country: 'Singaphore'
			owner: 'Naveen'
			articlename: 'ssw-winner-announced'
			tab: 'activities'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community'
			content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.'
			url: 'activities/ssw-winner-announced'
		],
		calendar: [
			title: 'Coming soon '
			content: 'wait'
			country: 'india'
			articlename: 'bye'
		],
		discussion: [
			title: 'SSW Winner Announced'
			day: '7'
			month: 'july'
			tags: 'developement'
			country: 'singaphore'
			owner: 'Naveen'
			articlename: 'ssw-winner-announced'
			tab: 'discussion'

			rate: 3
			fb: 30
			tw: 5
			gp: 10

			excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor'
			content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.'
			url: 'discussion/ssw-winner-announced'
		],


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
