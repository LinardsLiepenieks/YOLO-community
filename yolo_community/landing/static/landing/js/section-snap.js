

$(document).ready(function () {
	var aboutSlides = $(".about-slide-img-container img");
	var aboutSlidesContent = $(".about-slide-content-box");
	var curtainLeft = $("#curtainLeft");
	var curtainRight = $("#curtainRight");
	var readBar = $("#readBar");
	var readBarMaxLength = aboutSlides.length;
	var readBarLength = 0;
	readBar.css("width", "0%");
	aboutSlides.eq(0).addClass("active");
	aboutSlidesContent.eq(0).addClass("active");
	var curSection = 0;
	var aboutSlide = 0;
	var isAnimating = false;

	
	$("#about-us-right-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-right-btn > img").css("transform", "rotate(-90deg)");
	$("#about-us-left-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-left-btn > img").css("transform", "rotate(90deg)");
	$("#about-us-left-btn > img").css("opacity", "0.2");
	$("#about-us-left-btn").css("cursor", "default");

	
	function transitionAboutSlide(scrollDirection) {
		var currentSlide = aboutSlides.eq(aboutSlide);
		var currentSlideContent = aboutSlidesContent.eq(aboutSlide);
		let nextSlide = aboutSlides.eq(aboutSlide + scrollDirection);
		let nextSlideContent = aboutSlidesContent.eq(aboutSlide + scrollDirection);
		let curtain;
		let anim;
		isAnimating = true;
		if (aboutSlide+1 >= aboutSlides.length-1 && scrollDirection == 1) {
			$("#about-us-right-btn > img").css("opacity", "0.2");
			$("#about-us-right-btn > img").css("cursor", "default");
		} else {
			$("#about-us-right-btn > img").css("opacity", "1");
			$("#about-us-right-btn > img").css("cursor", "pointer");
		}
		if (aboutSlide >= 0  && scrollDirection == 1) {
			$("#about-us-left-btn > img").css("opacity", "1");
			$("#about-us-left-btn").css("cursor", "pointer");
		} else if (aboutSlide <= 1 && scrollDirection == -1) {
			$("#about-us-left-btn > img").css("opacity", "0.2");
			$("#about-us-left-btn").css("cursor", "default");
		}

		if (scrollDirection == 1)
		{
			curtain = curtainLeft;
			anim = {width: '100%'};
			animOut = {width: '0%', left: '100%'};
		}
		else if(scrollDirection == -1)
		{
			curtain = curtainRight;
			anim = {width: '100%', right: '0'};
			animOut = {width: '0%', right: '100%'};

		}
		readBarLength += scrollDirection;
		let readBarInc = (100/(readBarMaxLength-1)) * (readBarLength)
		console.log(readBarInc)
		readBar.css("width", readBarInc+"%")
		curtain.animate(anim, {
			duration: 400,
			easing: 'swing', // Use swing easing function
			complete: function() {
				currentSlide.removeClass("active");
				currentSlideContent.removeClass("active");
				aboutSlide += scrollDirection;
				nextSlide.addClass("active");
				nextSlideContent.addClass("active");
				curtain.animate(animOut, {
					duration: 400,
					easing: 'swing', // Use swing easing function
					complete: function() {
						curtain.removeAttr('style');
						isAnimating = false;
					}
				});
			}
		});
			
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
