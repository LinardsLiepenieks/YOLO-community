$(document).ready(function () {
    var aboutSlides = $(".about-us-slide");
	aboutSlides.eq(0).addClass("active");
    var aboutSlide = 0;
	var isAnimating = false;

    $("#about-us-right-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-right-btn > img").css("transform", "rotate(-90deg)");
	$("#about-us-left-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-left-btn > img").css("transform", "rotate(180deg)");

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
        console.log(1)
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

		/*// Fade in the next slide
		nextSlide.animate(
			{
				opacity: 1,
			},
			500,
			function () {
				nextSlide.addClass("active");
			}
		);*/
	}
    
    $("#about-us-right-btn").on("click", function () {
		if (isAnimating) {
			return;
		}
		if (curSection == 1 && aboutSlide < aboutSlides.length - 1) {
			transitionAboutSlide(1);
		}
	});
	$("#about-us-left-btn").on("click", function () {
		if (isAnimating) {
			return;
		}
		if (curSection == 1 && aboutSlide > 0) {
			transitionAboutSlide(-1);
		}
	});

});