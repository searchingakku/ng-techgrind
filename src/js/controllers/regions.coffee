#app.controller 'RegionsCtrl', ['$scope', '$location', 'steam', 'RichEditorService', '$http', '$routeParams', (S, loc, steam, richEditorService, http, rp) ->
#	S.getblog = getblog()
#	S.regionblog = {}
#	matchregion = (item) ->
#		console.log(sexpr("filter", item.country==rp.region, item.country, rp.region, item))
#		item.country==rp.region
#	console.log('route Params:: ',rp)
#	if !!rp.region
#		S.regionblog.news = S.getblog.news.filter(matchregion)
#		S.regionblog.articles = S.getblog.articles.filter(matchregion)
#		S.regionblog.calendar = S.getblog.calendar.filter(matchregion)
#	S.compose = ->
#		richEditorService.open()
#]



app = angular.module 'TechGrindApp.controllers.regions', []

app.controller 'RegionsCtrl', ['$scope', '$location', 'steam', 'RichEditorService', '$http', '$routeParams', ($scope, loc, steam, richEditorService, http, rp) ->

	$scope.rp = rp;

	$scope.compose = ->
		richEditorService.open()
]
