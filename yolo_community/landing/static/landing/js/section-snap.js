
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
	$("#about-us-left-btn > img").css("transform", "rotate(90deg)");
	$("#about-us-left-btn > img").css("opacity", "0");
	
	function transitionAboutSlide(scrollDirection) {
		// Dissolving animation between about slides - middle section
		var currentSlide = aboutSlides.eq(aboutSlide);
		let nextSlide = aboutSlides.eq(aboutSlide + scrollDirection);
		if (aboutSlide == 0 && scrollDirection == 1) {
			$("#about-us-right-btn > img").css("opacity", "0");
		} else if (aboutSlide == 1 && scrollDirection == -1) {
			$("#about-us-right-btn > img").css("opacity", "1");
		}
		if (aboutSlide == aboutSlides.length - 2 && scrollDirection == 1) {
			$("#about-us-left-btn > img").css("opacity", "1");
		} else if (aboutSlide == aboutSlides.length - 1 && scrollDirection == -1) {
			$("#about-us-left-btn > img").css("opacity", "0");
		}

		currentSlide.removeClass("active");
		aboutSlide += scrollDirection;
		console.log(nextSlide)
		nextSlide.addClass("active");
			
	}

	$("#about-us-btn").on("click", function () {
		// Move to the next section
		if (isAnimating) {
			return;
		}
		
		moveSection(1);
	});
	$("#about-us-btn-nav").on("click", function () {
		// Move to the next section
		if (isAnimating || curSection == 1) {
			return;
		}
		curSection = 0;
		moveSection(1);
	});
	$("#about-us-right-btn").on("click", function () {
		
		if (aboutSlide < aboutSlides.length - 1) {

			transitionAboutSlide(1);
		} 
	});
	$("#about-us-left-btn").on("click", function () {
		console.log(aboutSlide)
		if (aboutSlide > 0) {
			transitionAboutSlide(-1);
		}
	});
});
