/* ====================================================================
 * slideShow
 * 
 * Requirements:
 * 		Display a movie on first slide
 * 		Do not display movie as slides cycle
 * 		Skip movie if it can't be played in a browser
 * 		Cycle through slides
 * 		Allow users to choose a specific slide to view
 * 		Allow users to browse previous and next slides
 * 		Each slide will have additional text data to be placed in 
 * 			labels - position controlled by CSS
 *		When user selects next slide, the transition should happen
 * 			immediately
 * 		A slide should transition in or out in 1.5 seconds
 * 		A slide should remain visible for 7 seconds
 * 		Allow text to change on slides programatically
 * 		The movie should fade out if the user selects a slide
 * 
 * Rational:
 * 		The slideshow object transitions from one slide to the next
 * 		using CSS animation. The animation causes the opacity of 2
 * 		images to change.  One fading in, another fading out.
 * 
 * 		The slideshow object transitions from one slide to the next. 
 * 		The slides transition in and out through the CSS transition
 * 		statement, with opacity from 0 to 100%, a time of 1.5 seconds,
 * 		and a direction set by "Ease In and Out" or "Ease Out in the
 * 		case of movies.
 * 
 * 		If the user changes which slide they want to see next, all slides
 * 		are set to transition out, and the selected slide is transitioned
 * 		in.  This is accomplished by removing the css class "fade", which
 * 		triggers the fade in or fade out transition.
 * 
 * 		If a movie is playing at the time the user request a
 * 		different slide, the movie transitions out, and the slide 
 * 		transitions in normally.
 * 		
 * 
 * Todos
 * 		Review mobile specifications
 * 
 * Description:
 * 		Given the HTML TAG name, class-name, or ID, find the child  
 * 		FIGURE tags, then cycle through them, using CSS animation to 
 * 		fade between figures.
 * 
 * Syntax: 
 * 		var x = new slideShow (control, data);
 * 
 * Parameters:
 * 		control - descriptor / selector used to find the target HTML tag 
 * 				with the FIGURE tags to manipulate.
 *  
 * 		data - is a JSON object providing URLS, types, captions, and
 * 				loop information.  The control stores this data for
 * 				use as it loops through the slides.
 * 
 * Globals:
 * 		jQuery - cross platform public library js to manipulate the DOM
 * 
 * Static:
 * 		Object Values	
 * 		delay - amount of time a slide remains visible untill it fades out.
 * 
 * 		jQuery names into DOM ...
 *		slides - location where movies and figure TAGs should be stored.
 *		movie_template - location of movie template to use
 *		image_template - location of image template to use
 *		selector_template - location of radio button option to use
 *		prevnext_buttons - location of next and previous buttons
 *		button_prev - location of previous button
 *		button_next - location of next button
 *		slide_selector - location where position picking radio buttons are placed
 *		current_slide - locations of radio buttons
 * 
 * 		CSS names 
 *		fade - used to transition images slides
 * 
 * 		JavaScript Event Names
 *		endAnimation - all events in all browsers that capture transition 
 * 			end events
 * 		endMovie - all events in all browsers that capture transition 
 * 			end events
 * 
 * Properties:
 *		control - jQuery pointer to this Controls Instance
 *		slide_selector - jQuery pointer to position radio buttons 
 *		slides - jQuery pointer to list of images and movies 
 *		figures - jQuery list of images and movies found in slides
 *		slide_fading - current slide being shown
 *		_data - copy of data parameter
 * 		isiPhone - don't run movies on iPhones or androids
 * 		slide_timer - the delay timer between slide transitions
 * 
 * Methods:
 * 		constructor - initializes this instance with the location in DOM
 * 			where the visual components to be controlled are.  And migrates
 * 			data from the list of movies and images into the DOM for 
 * 			animation.
 * 
 *		_addEventHandlers - adds general event handlers onto the DOM
 * 			concerning current slide selections, and previous and next
 * 			buttons.
 * 
 *		_onPrevSlide - captures UX request to display the previous slide
 * 
 *		_onNextSlide - captures UX request to display the next slide
 * 
 *		_onChangePosition - captures UX request to display a specific slide
 * 
 *		_setSlideSelector - sets the current position of the slide selector 
 *
 * 		_cycle - animates all found FIGURE tags found in the target 
 * 			HTML tag.
 * 
 * 		_viewSlide - stops the delay clock, and switches the current slide
 * 			being viewed.
 * 
 *		_changeSlide - updates the slide selector and which slides are
 * 			transitioning
 * 
 * 		_setTransition - tells the slide to transition into view
 * 
 * 		_clearAllTransition - hides all slides from view
 * 
 * 		_clearTransition - hides a specific slide from view
 * 
 * 		isMovie - is the current slide tagged as a movie?
 * 
 * 		getNextSlide - get the next slide, skipping the movie, and
 * 			looping back to 1 if the current slide is greater than # of 
 * 			slides provided.
 * 			
 * 		getPrevSlide -  get the previous slide, skipping the movie, and
 * 			looping back to n-1 if the current slide is less than 0.
 * 
 *		_initSelector - for each JSON object in images and movies list, 
 * 			a corresponding radio button is added to the slide selector.
 * 
 *		_loadFigures - reads JSON object passed into construct, and adds
 * 			images and movies found into DOM using template.
 * 
 * Tests:
 * 		UX
 * 			Movie plays and transition to next slide
 * 			Movie is skipped in specific browsers that don't play movies
 * 			Slides transition properly from 1 to 4
 * 			Slides transition in and out in 1.5 seconds
 * 			Slides are visible for the delay count
 * 			Slides loop from last slide to first slide
 * 			User selects prev button - previous slide appears
 * 			User selects next button - next slide appears
 * 			User selects a specific slide - that slide appears
 * 			Caption is styled by CSS
 * 			Caption is not visible when a movie plays
 * 
 * 		Data
 * 			Number of slides shown dependent on number of 
 * 			Number of slector radio buttons depends on number of 
 * 				slides that are images vs movies.
 * 			Captions visible in UX reflect what is in data file
 * 
 * 		UX-Developer Tests
 * 			Changing position of HTML elements via CSS has no effect
 * 			Changing position of HTML elements has no effect, as
 * 				long as DOM Heirarchy is not affected
 * 			Having more than one instance works as expected.
 * 			Changing radio buttons to other DOM tags has no affect on
 * 				javascript (T'Ya!!! NOT!)
 * 			Changing prev and next button to IMG or DIV tags has no 
 * 				affect  (Not Sure)
 * 			Changing Size of slideshow object through CSS has no affect 
 * 				on javascript
 * 
 * Notes:
 * 		A position delegate should be used to trigger the proper slide 
 * 		to show, as well as update the slide selector (radio buttons).
 * 
 * 		If the radio buttons are swapped out with other DOM TAGs, then
 * 		the event handlers for the selector will need to be updated.  For
 * 		example, some times DIV tags are for check boxes and radio buttons.
 * 		In other situations, a slider could be used or a UL tag to create
 * 		tabs. And a drop down list box or combo box could be used.  Each
 * 		of which has their own method for being located in the DOM, 
 * 		manipulated, as well as which events they fire off when selected 
 * 		by the user.
 * 
 * Version:
 * 		0.7 - switched from animation to transition, simpler CSS and 
 * 				cleaner HTML coding
 * 		0.8	- added fade out for the movie
 * 		0.9 - added timeout delay to slide transition complete event 
 * 				which has solved the transition problems
 * 		1.0 - released for prime time
 * 
 * ====================================================================
 */

var slideShow = function (control, list) 
{
	var self = this;
	
	self.control = control;
	self._data = list;
	
	self.isiPhone = isiPhone();
	
	self.slides = $(control).children (slideShow.STATIC.slides);
	self.slide_selector = $(control).children (slideShow.STATIC.slide_selector);
	self.prevnext_buttons = $(control).children (slideShow.STATIC.prevnext_buttons);
	
	self._loadFigures 
	(
		slideShow.STATIC.movie_template, 
		slideShow.STATIC.image_template, 
		list
	);
	self._initSelector (slideShow.STATIC.selector_template, list);
	
	self.figures = $(self.slides).children("figure");

	self._addEventHandlers.call (this);
	
	self._changeSlide (0);
};

// ====================================================

slideShow.STATIC = 
{
	// DOM selectors
	slides : "#slides",
	movie_template : "#slideShow-movie-template",
	image_template : "#slideShow-image-template",
	selector_template : "#slideShow-selector-template",
	prevnext_buttons : "#nextprev",
	button_prev : "#button-prev",
	button_next : "#button-next",
	slide_selector : "#slide-selector",
	current_slide : "#current-slide",
	delay : 7000,
	
	// CSS
	fade : "fade",
	
	// EVENTS
	endAnimation : "webkitTransitionEnd transitionend",
	endMovie : "ended",
};

slideShow.prototype.control = "";
slideShow.prototype.slide_selector = {};
slideShow.prototype.slides = {};
slideShow.prototype.figures = [];
slideShow.prototype.slide_fading = 0;
slideShow.prototype._data = null;
slideShow.prototype.isiPhone = false;
slideShow.prototype.slide_timer = null;

// ====================================================

slideShow.prototype._addEventHandlers = function ()
{
	var self = this;
	
	$(self.control).children(slideShow.STATIC.slide_selector).on 
	("change", 
		function () 
		{ self._onChangePosition.call (self); }
	);

	$(self.prevnext_buttons).children(slideShow.STATIC.button_prev).on 
	("click", 
		function () 
		{ self._onPrevSlide.call (self); }
	);

	$(self.prevnext_buttons).children(slideShow.STATIC.button_next).on 
	("click", 
		function () 
		{ self._onNextSlide.call (self); }
	);
};

// ====================================================

slideShow.prototype._onPrevSlide = function ()
{
	var self = this;
	var nPos = self.slide_fading;
	
	nPos = self.getPrevSlide (nPos);
	
	self._viewSlide (nPos);
};

slideShow.prototype._onNextSlide = function ()
{
	var self = this;
	var nPos = self.slide_fading;
	
	nPos = self.getNextSlide (nPos);

	self._viewSlide (nPos);
};	

slideShow.prototype._onChangePosition = function ()
{
	var self = this;
	
	var radioButtons = $(self.slide_selector).
		children (slideShow.STATIC.current_slide);
		
	var nPos = -1;
	radioButtons.each (
		function (index, item)
		{
			if (item.checked)
				nPos = $(item).val();
		});

	// there must be a better way to retrieve the value of the current
	// selected radio button.
	
	self._viewSlide (nPos);
};

// ====================================================

slideShow.prototype._setSlideSelector = function (nPos)
{
	var self = this;
	var figure = self.figures [nPos];

	var radioButtons = $(self.slide_selector).
		children (slideShow.STATIC.current_slide);
		
	radioButtons[nPos].checked = true;
};

// ====================================================

slideShow.prototype._cycle = function ()
{
	var self = this;
	var nPos = self.slide_fading;
	var fadeOut = self.getNextSlide (nPos);
	
	self._changeSlide (fadeOut);
};

slideShow.prototype._viewSlide = function (fadeInNow)
{
	var self = this;
	
	clearTimeout (self.slide_timer);
	self._changeSlide (fadeInNow);
};

// this assumes that the current slide has an opacity of 1.
slideShow.prototype._changeSlide = function (fadeOut)
{
	var self = this;

	self.slide_fading = fadeOut;
	self._setSlideSelector (fadeOut);
	
	self._clearAllEventHandlers ();
	self._clearAllTransitions ();
	
	self._setEventHandler (fadeOut);
	self._setTransition (fadeOut);	
};

// ====================================================

slideShow.prototype._setEventHandler = function (nPos)
{
	var self = this;
	var figure = self.figures [nPos];
	var thsSlide = nPos;
	
	// console.log ("setting event handler on slide " + nPos);
	
	switch (self._data[nPos].type)
	{
		case "movie" : 
		{
			var movie = $(figure).children ("video")[0]

			$(movie).on (slideShow.STATIC.endMovie, 
				function () 
				{ self._cycle.call (self); }
			);
			
			movie.play();
			break;
		} 

		case "image" : 
		{
			$(figure).on (slideShow.STATIC.endAnimation, 
				function (event) 
				{ 
					$(function()
					{
						function slide_delay()
						{ self._cycle.call (self); };
					   self.slide_timer = window.setTimeout (slide_delay, slideShow.STATIC.delay ); // 5 seconds
					});
				}
			);
			
			break;
		} 
	}
};

slideShow.prototype._clearAllEventHandlers = function ()
{
	var self = this;
	for (var t=0; t<self.figures.length; t++)
		self._clearEventHandler (t);
}

slideShow.prototype._clearEventHandler = function (nPos)
{
	var self = this;
	var figure = self.figures [nPos];

	switch (self._data[nPos].type)
	{
		case "movie" : 
		{
			var movie = $(figure).children ("video")[0]
			
			$(movie).off (slideShow.STATIC.endMovie);
			
			movie.pause();
			break;
		} 

		case "image" : 
		{
			$(figure).off (slideShow.STATIC.endAnimation); 
			break;
		} 
	}
};

// ====================================================

slideShow.prototype._setTransition = function (nPos)
{
	var self = this;
	var figure = self.figures [nPos];

	switch (self._data[nPos].type)
	{
		case "movie" : 
		{
			$(figure).addClass("show");
			break;
		} 

		case "image" : 
		{
			$(figure).addClass (slideShow.STATIC.fade);
			break;
		} 
	}
};

slideShow.prototype._clearAllTransitions = function ()
{
	var self = this;
	for (var t=0; t<self.figures.length; t++)
		self._clearTransition (t);
}

slideShow.prototype._clearTransition = function (nPos)
{
	var self = this;
	var figure = self.figures [nPos];
	
	switch (self._data[nPos].type)
	{
		case "movie" : 
		{
			$(figure).removeClass("show");
			
			break;
		} 

		case "image" : 
		{
			$(figure).removeClass (slideShow.STATIC.fade);
			break;
		} 
	}
};

// ====================================================

slideShow.prototype.isMovie = function (nPos)
{
	var self = this;
	return (self._data[nPos].type == "movie")
};

slideShow.prototype.getNextSlide = function (nPos)
{
	var self = this;
	var nLen = self.figures.length;
	
	var next = ((nPos+1) % nLen);

	if (self.isMovie(next))
		next = ((next+1) % nLen);

	return (next);
};

slideShow.prototype.getPrevSlide = function (nPos)
{
	var self = this;
	var nLen = self.figures.length;
	
	var prev  = ((nPos-1) % nLen);
	if (prev < 0) prev = nLen -1;
	
	if (self.isMovie(prev))
	{
		prev = ((prev-1) % nLen);
		if (prev < 0) prev = nLen -1;
	}
	
	return (prev);
};

// ====================================================

slideShow.prototype._initSelector = function (template, list)
{
	var self = this;
	
	var option_temp = $(template);
	var szHTML = option_temp.html();
	var t = 0;
	
	list.forEach (
	function (item, index)
	{
		var szPost = "";
		
		szPost = szHTML.replace ("[?=value ?]", t);
		szPost = szPost.replace ("[?=class ?]", item.type);
		
		self.slide_selector.append (szPost);

		t++;		
	});	
};

slideShow.prototype._loadFigures = function (movie_template, image_template, list)
{
	var self = this;
	
	var image_temp = $(image_template);
	var movie_temp = $(movie_template);
	var szHTML = "";
	var t = 0;
	
	list.forEach (
	function (item, index)
	{
		var szImage = item.url;
		var szCaption = item.caption;
		var szPost = "";
	
		switch (item.type)
		{
			case "image" : szHTML = image_temp.html(); break;
			case "movie" : szHTML = movie_temp.html(); break;
		}
		
		szPost = szHTML.replace ("[?=image ?]", szImage);
		szPost = szPost.replace ("[?=caption ?]", szCaption);
		szPost = szPost.replace ("[?=t ]", t);
		
		t++;
		
		self.slides.append (szPost);
	});
};

// =====================================================================

function isiPhone()
{
    return (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
    );
}
