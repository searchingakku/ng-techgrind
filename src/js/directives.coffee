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

directives.directive 'calendar', ($parse) ->
	restrict: 'A'
	link: (scope, element, attrs) ->
		#region = $parse(attrs['region'])
		#calendar = $parse(attrs['calendar'])

		#We need to make it an observeble 
		attrs.$observe "calendar", (actual_value_from_calendar_attr) ->
			calendar = actual_value_from_calendar_attr

			console.log(sexpr("calendar-directive", calendar))
			regions = 
				thailand: [ # techgrindth 
					'https://www.google.com/calendar/feeds/7rd1tlnke94kh99ub6vta9ov34%40group.calendar.google.com/public/basic',
					# Thai Holidays
					'https://www.google.com/calendar/feeds/en.thai%23holiday%40group.v.calendar.google.com/public/basic']
				singapore: [ # techgrindsg 
					'https://www.google.com/calendar/feeds/c6itotjtf79b07k42qqo5ngqu4%40group.calendar.google.com/public/basic', 
					# Singaporean Holidays 
					'https://www.google.com/calendar/feeds/en.singapore%23holiday%40group.v.calendar.google.com/public/basic' ]
	
			if calendar == "all"
				cal = regions['thailand'].concat(regions['singapore'])
			else
				cal = regions[calendar]
	
			element.fullCalendar(
				header:
					left: 'title'
					center: ''
					right: 'today'
					# left: 'prev,next today'
					# center: 'title'
					# right: 'month,basicWeek,basicDay'
				eventSources: cal
				eventClick: (event) ->
					window.open(event.url, 'gcalevent', 'width=700,height=600')
					false
				loading: (bool) ->
					if bool 
						$('#loading').show()
					else
						$('#loading').hide())
