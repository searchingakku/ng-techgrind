directives = angular.module 'TechGrindApp.directives', []
directives.directive 'appVersion', ['version', (version) ->
	return (scope, elm, attrs) -> elm.text version
]

directives.directive 'draggable', ->
	restrict: 'A'
	link: (scope, elm, attrs) ->
		elm.draggable(revert: true)

directives.directive 'droppable', ($compile) ->
	restrict: 'A'
	link: (scope, element, attrs) ->
		console.log(""+element)
		element.droppable(drop: (event,ui) ->
			dragIndex = angular.element(ui.draggable).data('index')
			reject = angular.element(ui.draggable).data('reject')
			dragEl = angular.element(ui.draggable).parent()
			dropEl = angular.element(this)
			if (dragEl.hasClass('list1') && !dropEl.hasClass('list1') && reject is not true)
				scope.list2.push(scope.list1[dragIndex])
				scope.list1.splice(dragIndex, 1)
			else if (dragEl.hasClass('list2') && !dropEl.hasClass('list2') && reject is not true)
				scope.list1.push(scope.list2[dragIndex])
				scope.list2.splice(dragIndex, 1)
			scope.$apply()
		)
