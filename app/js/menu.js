/*
	Thanks to Eduard Mayer
	http://vsxed.github.io/play-store-menu
*/

$(function () {
	var link = $('.play-menu li a'),
		expander = $('.show-entries-hover'),
		container = $('.menu-container'),
		pos1 = 0,
		pos2 = "46px",
		pos3 = "92px",
		pos4 = "138px",
		pos5 = "184px",
		pos6 = "230px",
		pos7 = "276px",
		left = "-200px"
		homeColor = "#444",
		regionsColor = "#B3C833",
		calendarColor = "#CE5043",
		eventsColor = "#FB8521",
		resourcesColor = "#1AA1E1",
		mediaColor = "#658092",
		partnersColor = "#B3C833";
	
	// Initialization, start positions
	$('li#home').css('top', pos1);
	$('li#home .menu-entry-text').css({'background-color' : homeColor,'color' : 'white'});
	$('li#regions').css('top', pos2);
	$('li#calendar').css('top', pos3);
	$('li#events').css('top', pos4);
	$('li#resources').css('top', pos5);
	$('li#media').css('top', pos6);
	$('li#partners').css('top', pos7);

	// Back
	$('.back').on('click', function() {
		$(this).parent().parent().parent().find('.sub-menu').css({'opacity' : 0}).addClass('index').removeClass('active');
	});

	
	// Click function standard
	link.each(function() {
		$(this).on('click', function() {
			// Remove Background-Color when i click on an unselected item
			// Hiding is removed for debugging
			link.not($(this)).parent().addClass('hide');
			expander.removeClass('hidden');
			link.not($(this)).children('.menu-entry-text').attr("style", "");
			// Hide all menus except the right one
			link.not($(this)).next('.sub-menu').css({'opacity' : 0}).addClass('index').removeClass('active');
			$(this).next('.sub-menu').css({'opacity' : 1}).addClass('active');

			// Changing Background-Color and Position
			// "Home" - This also resets all menu entries to their initial order
			if ($(this).children().hasClass('home')) {
				$(this).children('.menu-entry-text').css({'background-color' : homeColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#regions').css('top', pos2);
				$('#calendar').css('top', pos3);
				$('#events').css('top', pos4);
				$('#resources').css('top', pos5);
				$('#media').css('top', pos6);
				$('li').removeClass('hide');
			}
			// "Regions"
			else if ($(this).children().hasClass('regions')) {
				$(this).children('.menu-entry-text').css({'background-color' : regionsColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#home').css('top', pos6);
				$('#calendar').css('top', pos2);
				$('#events').css('top', pos3);
				$('#resources').css('top', pos4);
				$('#media').css('top', pos5);
				$('.hide').css({'left': left, 'opacity' : 0, 'transition' : 'all 0s', '-webkit-transition' : 'all 0s', '-moz-transition' : 'all 0s' });
			}
			// "Calendar"
			else if ($(this).children().hasClass('calendar')) {
				$(this).children('.menu-entry-text').css({'background-color' : calendarColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#home').css('top', pos6);
				$('#regions').css('top', pos2);
				$('#events').css('top', pos3);
				$('#resources').css('top', pos4);
				$('#media').css('top', pos5);
				$('.hide').css({'left': left, 'opacity' : 0, 'transition' : 'all 0s', '-webkit-transition' : 'all 0s', '-moz-transition' : 'all 0s' });
			}
			// "Events"
			else if ($(this).children().hasClass('events')) {
				$(this).children('.menu-entry-text').css({'background-color' : eventsColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#home').css('top', pos6);
				$('#regions').css('top', pos2);
				$('#calendar').css('top', pos3);
				$('#resources').css('top', pos4);
				$('#media').css('top', pos5);
				$('.hide').css({'left': left, 'opacity' : 0, 'transition' : 'all 0s', '-webkit-transition' : 'all 0s', '-moz-transition' : 'all 0s' });
			}
			// "Resources"
			else if ($(this).children().hasClass('resources')) {
				$(this).children('.menu-entry-text').css({'background-color' : resourcesColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#home').css('top', pos6);
				$('#regions').css('top', pos2);
				$('#calendar').css('top', pos3);
				$('#events').css('top', pos4);
				$('#media').css('top', pos5);
				$('.hide').css({'left': left, 'opacity' : 0, 'transition' : 'all 0s', '-webkit-transition' : 'all 0s', '-moz-transition' : 'all 0s' });
			}
			// "Media"
			else if ($(this).children().hasClass('media')) {
				$(this).children('.menu-entry-text').css({'background-color' : mediaColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#home').css('top', pos6);
				$('#regions').css('top', pos2);
				$('#calendar').css('top', pos3);
				$('#events').css('top', pos4);
				$('#resources').css('top', pos5);
				$('.hide').css({'left': left, 'opacity' : 0, 'transition' : 'all 0s', '-webkit-transition' : 'all 0s', '-moz-transition' : 'all 0s' });
			}

			// "Partners"
			else if ($(this).children().hasClass('partners')) {
				$(this).children('.menu-entry-text').css({'background-color' : partnersColor, 'color' : 'white'});
				$(this).parent().css('top', pos1).removeClass('hide');
				$('#home').css('top', pos6);
				$('#regions').css('top', pos2);
				$('#calendar').css('top', pos3);
				$('#events').css('top', pos4);
				$('#resources').css('top', pos5);
				$('.hide').css({'left': left, 'opacity' : 0, 'transition' : 'all 0s', '-webkit-transition' : 'all 0s', '-moz-transition' : 'all 0s' });
			}
			
			return false;
		});
	});
	
	// Hide menu when you leave the menu container
	container.on('mouseleave', function() {
		$('.hide').css({'left': left, 'opacity' : 0, 'transition' : '', '-webkit-transition' : '', '-moz-transition' : ''});
		$('.sub-menu').removeClass('index');
	})

	// Show the menu when you hover the trigger 
	expander.on('mouseover', function() {
		$('.hide').css({'left': 0, 'opacity' : 1, 'transition' : '', '-webkit-transition' : '', '-moz-transition' : ''});
		$('.sub-menu').addClass('index');
	});
});
