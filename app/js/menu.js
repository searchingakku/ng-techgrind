/*
	Thanks to Eduard Mayer
	http://vsxed.github.io/play-store-menu
*/

$(function() {
	var link = $('.play-menu > li > a'),
	pos1 = 0,
	pos2 = 50,
	pos3 = 100,
	pos4 = 150,
	pos5 = 200,
	pos6 = 250,
	pos7 = 300;

	$('li#home').css('top', pos1);
	$('li#regions').css('top', pos2);
	$('li#calendar').css('top', pos3);
	$('li#events').css('top', pos4);
	$('li#resources').css('top', pos5);
	$('li#media').css('top', pos6);
	$('li#partners').css('top', pos7);

	//- Main Navigation - top level
	link.each(function() {
		$(this).on('click', function() {
			$('li#home').removeClass('active');

			link.not($(this)).parent().not('#home, .main-link').addClass('hide');

			link.not($(this)).next('.sub-menu').css({'opacity' : 0}).removeClass('active');
			$(this).next('.sub-menu').css({'opacity' : 1}).addClass('active');

			//- Home
			if ($(this).children().hasClass('home')) {
				$(this).parent().css('top', pos1);
				$('li#regions').css('top', pos2);
				$('li#calendar').css('top', pos3);
				$('li#events').css('top', pos4);
				$('li#resources').css('top', pos5);
				$('li#media').css('top', pos6);
				$('li#partners').css('top', pos7);

				$('.play-menu li').removeClass('hide');
				setTimeout(function() {
					$('.play-menu li').not('#home').removeClass('active');
					$('.play-menu li#home').addClass('active');
				}, 500);

				// Reset sub level highlight
				$('.main-link').removeClass('current');
				$('.sub-menu').find('li:eq(0)').addClass('current');
			}

			//- Regions
			else if ($(this).children().hasClass('regions')) {
				$(this).parent().css('top',pos1);
				$(this).parent().addClass('active');
				$('#home').css('top', pos1+450);
			}

			//- Calendar
			else if ($(this).children().hasClass('calendar')) {
				$(this).parent().css('top',pos1);
				$(this).parent().addClass('active');
				$('#home').css('top', pos1+100);
			}

			//- Events
			else if ($(this).children().hasClass('events')) {
				$(this).parent().css('top',pos1);
				$(this).parent().addClass('active');
				$('#home').css('top', pos1+150);
			}

			//- Resources
			else if ($(this).children().hasClass('resources')) {
				$(this).parent().css('top',pos1);
				$(this).parent().addClass('active');
				$('#home').css('top', pos1+150);
			}

			//- Mdia
			else if ($(this).children().hasClass('media')) {
				$(this).parent().css('top',pos1);
				$(this).parent().addClass('active');
				$('#home').css('top', pos1+100);
			}

			//- Partners
			else if ($(this).children().hasClass('partners')) {
				$(this).parent().css('top',pos1);
				$(this).parent().addClass('active');
				$('#home').css('top', pos1+100);
			}
			return false;
		});
	});

	//- Main Navigation - sub level
	$('.sub-menu li').on('click', function() {
	 	$(this).closest('ul').find('li').removeClass('current');
		$(this).addClass('current');
		return false;
	});
});






