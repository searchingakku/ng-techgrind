angular.scenario.dsl 'expectClass', -> (klass, selector, label) ->
	expect(element(selector, label).prop('classList')).toContain klass

angular.scenario.dsl 'expectViewText', -> (text, selector, label) ->
	expect(element("[ng-view] "+ (selector || ''), label).text()).toMatch text

angular.scenario.dsl 'expectLink', -> (link, text) ->
	a = using(@selector||'').element("[href='#{link}']")
	expect(a.count()).toBe 1
	expect(a.text()).toMatch text

describe 'Tech Grind app', ->
	describe 'root page', ->
		beforeEach -> browser().navigateTo '/'
		it 'shows the home page', -> expect(browser().location().url()).toBe '/home'
		it 'has a menu', ->
		it 'has a footer', ->
			# About
			using('footer').expectLink '#/about', 'About Us'
			using('footer').expectLink 'https://twitter.com/Tech_Grind', 'Twitter'
			using('footer').expectLink 'http://www.facebook.com/techgrind/', 'Facebook'
			using('footer').expectLink 'https://plus.google.com/114529345031512116214/posts/', 'Google+'
			# Support
			using('footer').expectLink '#/faq', 'FAQ'
			using('footer').expectLink '#/feedback', 'Feedback'
			using('footer').expectLink '#/contact', 'Contact Us'
			# # Legal
			# using('footer').expectLink 'javascript:;', 'License'
			# using('footer').expectLink 'javascript:;', 'Terms of Use'
			# using('footer').expectLink 'javascript:;', 'Privacy Policy'
			# using('footer').expectLink 'javascript:;', 'Security'
			# # Settings
			# using('footer').expectLink 'javascript:;', 'Login'
			# using('footer').expectLink 'javascript:;', 'Sign Up'
			# using('footer').expectLink 'javascript:;', 'Account Settings'
			# using('footer').expectLink 'javascript:;', 'Privacy Settings'
	describe 'home page', ->
		beforeEach -> browser().navigateTo '#/home'
		it 'shows social media buttons', -> expectViewText '', '.addthis_toolbox'
		it 'shows Top happenings', -> expectViewText 'Top Happenings'
		it 'shows Latest Content', -> expectViewText 'Latest Content'
		it 'highlights the home menu and only that', ->
			expectClass 'active', '#menu #home'
			expect(element('#menu [class="active"]').count()).toBe 1

	describe 'regions', ->
		beforeEach -> browser().navigateTo '#/regions'

	describe 'a specific region', ->
		beforeEach -> browser().navigateTo '#/regions/thailand'

	describe 'calendar', ->
	describe 'events', ->
	describe 'resources', ->
	describe 'media', ->
	describe 'partners', ->
		xit 'shows Global Partners'
		xit 'has Connect With Us form'
