$(document).ready(function () {
	var sections = $("section");
	var aboutSlides = $(".about-us-slide");
	var curSection = 0;
	var aboutSlide = 0;
	var isAnimating = false;
	var navBarOn = false;
	var navbar = $("nav");
	//navbar.css("opacity", 0);

	$("#landing-container").on("mousewheel", function (e) {
		let scrollDirection = e.originalEvent.deltaY > 0 ? 1 : -1;
		if (isSectionScrollable(scrollDirection) && !isAnimating) {
			let innerSection = sections.eq(curSection);
			let currentScrollTop = innerSection.scrollTop();
			let newScrollTop = currentScrollTop + scrollDirection * 250;
			isAnimating = true;
			// Animate the scrollTop property
			innerSection
				.stop()
				.animate({ scrollTop: newScrollTop }, 200, function () {
					console.log(innerSection.scrollTop());
					isAnimating = false;
				});

			return;
		}
		e.preventDefault();
		//check direction of scroll
		if (
			curSection + scrollDirection < 0 ||
			curSection + scrollDirection > sections.length - 1
		) {
			return;
		}

		if (isAnimating) {
			return;
		}

		if (
			curSection == 1 &&
			aboutSlide + scrollDirection > -1 &&
			aboutSlide + scrollDirection < aboutSlides.length
		) {
			// Dissolving animation between about slides
			var currentSlide = aboutSlides.eq(aboutSlide);
			var nextSlide = aboutSlides.eq(aboutSlide + scrollDirection);
			nextSlide.css("display", "block");
			isAnimating = true;

			// Fade out the current slide
			currentSlide.animate(
				{
					opacity: 0,
				},
				500,
				function () {
					// Reset opacity and update aboutSlide
					currentSlide
						.css("opacity", 1)
						.css("display", "none")
						.removeClass("active");
					aboutSlide += scrollDirection;
					isAnimating = false;
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
		} else {
			// Move to the next section
			curSection += scrollDirection;
			isAnimating = true;
			$("#landing-container")
				.stop()
				.animate(
					{
						scrollTop:
							$("#landing-container").scrollTop() +
							sections.eq(curSection).offset().top,
					},
					1000,
					function () {
						isAnimating = false;
					}
				);
		}
		//enableNavbar();
	});

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

	/*
	//function in case wanna hide navbar - deprecated
	function enableNavbar() {
		if (curSection > 0) {
			if (!navBarOn) {
				navbar.stop().animate({ opacity: 1 });
			}
		} else {
			navbar.stop().animate({ opacity: 0 });
		}
	}
	*/
});
