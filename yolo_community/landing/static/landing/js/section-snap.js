$(document).ready(function () {
	var navbar = $("nav");
	var sections = $("section");
	var aboutSlides = $(".about-us-slide");
	aboutSlides.eq(0).addClass("active");
	var curSection = 0;
	var aboutSlide = 0;
	var isAnimating = false;
	$("#about-us-right-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-right-btn > img").css("transform", "rotate(-90deg)");
	$("#about-us-left-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-left-btn > img").css("transform", "rotate(180deg)");

	/*
	//this might be needed for scrollable sections - further testing needed
	function scrollScrollableSection(scrollDirection) {
		//free scroll for scrollable sections
		let innerSection = sections.eq(curSection);
		let currentScrollTop = innerSection.scrollTop();
		let newScrollTop = currentScrollTop + scrollDirection * 250;
		isAnimating = true;
		// Animate the scrollTop property
		innerSection.stop().animate({ scrollTop: newScrollTop }, 200, function () {
			console.log(innerSection.scrollTop());
			isAnimating = false;
		});

		return;
	}
	*/

	function transitionAboutSlide(scrollDirection) {
		// Dissolving animation between about slides - middle section
		let currentSlide = aboutSlides.eq(aboutSlide);
		let nextSlide = aboutSlides.eq(aboutSlide + scrollDirection);
		nextSlide.css("display", "flex");
		isAnimating = true;
		if (aboutSlide == 0 && scrollDirection == 1) {
			$("#about-us-left-btn > img").css("transform", "rotate(90deg)");
		} else if (aboutSlide == 1 && scrollDirection == -1) {
			$("#about-us-left-btn > img").css("transform", "rotate(180deg)");
		}
		if (aboutSlide == aboutSlides.length - 2 && scrollDirection == 1) {
			$("#about-us-right-btn > img").css("transform", "rotate(0deg)");
		} else if (aboutSlide == aboutSlides.length - 1 && scrollDirection == -1) {
			$("#about-us-right-btn > img").css("transform", "rotate(-90deg)");
		}
		// Fade out the current slide
		currentSlide.animate(
			{
				opacity: 0,
			},
			{
				duration: 500,
				complete: function () {
					// Reset opacity and update aboutSlide
					currentSlide
						.css("opacity", 1)
						.css("display", "none")
						.removeClass("active");
					aboutSlide += scrollDirection;
					isAnimating = false;
				},
			}
		);

		// Fade in the next slide
		nextSlide.animate(
			{
				opacity: 1,
			},
			500,
			function () {
				nextSlide.addClass("active");
			}
		);
	}

	function moveSection(scrollDirection) {
		curSection += scrollDirection;
		isAnimating = true;
		$("#landing-container")
			.stop()
			.animate(
				{
					scrollTop:
						$("#landing-container").scrollTop() +
						sections.eq(curSection).offset().top -
						navbar.height(),
				},
				1000,
				function () {
					isAnimating = false;
				}
			);
	}

	function isSectionScrollable(scrollDirection) {
		let section = sections.eq(curSection);

		let scrollTop = section.scrollTop();
		let sectionHeight = section.height();
		let contentHeight = section.prop("scrollHeight");

		// Check if there is more content to scroll down
		let canScrollDown =
			scrollTop + sectionHeight < contentHeight && scrollDirection === 1;

		// Check if there is more content hidden on top to scroll up
		let canScrollUp = scrollTop > 0 && scrollDirection === -1;
		// Additional check for overflow
		let overflowStyle = section.css("overflow");
		let isOverflowScroll =
			overflowStyle === "auto" ||
			overflowStyle === "scroll" ||
			overflowStyle == "auto scroll";
		return (canScrollDown || canScrollUp) && isOverflowScroll;
	}
	$("#landing-container").on("mousewheel", function (e) {
		let scrollDirection = e.originalEvent.deltaY > 0 ? 1 : -1;
		if (isSectionScrollable(scrollDirection) && !isAnimating) {
			//if there is space left then scroll section normally
			return;
		}
		e.preventDefault();

		if (
			curSection + scrollDirection < 0 ||
			curSection + scrollDirection > sections.length - 1
		) {
			//return if there is no section to scroll to (above or below)
			return;
		}

		if (isAnimating) {
			//return if another section transition is happening
			return;
		}

		if (
			curSection == 1 &&
			aboutSlide + scrollDirection > -1 &&
			aboutSlide + scrollDirection < aboutSlides.length
		) {
			transitionAboutSlide(scrollDirection);
		} else {
			// Move to the next section
			moveSection(scrollDirection);
		}
	});

	$("#about-us-btn").on("click", function () {
		// Move to the next section
		if (isAnimating) {
			return;
		}
		moveSection(1);
	});
	$("#about-us-right-btn").on("click", function () {
		if (isAnimating) {
			return;
		}
		if (curSection == 1 && aboutSlide < aboutSlides.length - 1) {
			transitionAboutSlide(1);
		} else if (curSection == 1 && aboutSlide >= aboutSlides.length - 1) {
			aboutSlide = aboutSlides.length - 1;
			moveSection(1);
		}
	});
	$("#about-us-left-btn").on("click", function () {
		if (isAnimating) {
			return;
		}
		if (curSection == 1 && aboutSlide > 0) {
			transitionAboutSlide(-1);
		} else if (curSection == 1 && aboutSlide <= 0) {
			aboutSlide = 0;
			moveSection(-1);
		}
	});
});
