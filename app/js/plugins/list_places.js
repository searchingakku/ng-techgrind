/*
	list_places:
		display-style___________
		this list object should display elements in a vertical 1-column list with:
		* a large thumbnail image
		* name
		* type (what type of entity is it?)
		* role (what role does this place serve?)
		* location (full-address) + maplink
		* price (per-day/week/month)
		* days/hours-open
		
		example:
		* <nice image of conference room>
		* LaunchPad
		* Coworking
		* Startups, Events, Community
		* 39 Pan Road, Bangkok, Thailand 12345 [+]
		* 200/day 7000/month
		* Mon-Fri 9-20, Sat-Sun 10-18
 
		functional goal___________
		this list object should display in a large height+full width listing with a
			large thumbnail, allowing user to navigate to the full-profile-page
			of the displayed place on interaction.
			
		example-place -> displayed information ==> action-on-interaction:
			coworking/office/incubator -> large thumbnail image + detailed info ==> profile page
*/