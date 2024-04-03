$(document).ready(function () {
    var aboutSlides = $(".about-slide-img-container img");
    var aboutSlidesContent = $(".about-slide-content-box");
    var curtainLeft = $("#curtainLeft");
    var curtainRight = $("#curtainRight");
    var readBar = $("#readBar");
    var readBarMaxLength = aboutSlides.length;
    var readBarLength = 0;
    var curSection = 0;
    var aboutSlide = 0;
    var isAnimating = false;

    readBar.css("width", "0%");
    aboutSlides.eq(0).addClass("active");
    aboutSlidesContent.eq(0).addClass("active");

	$("#about-us-right-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-right-btn > img").css("transform", "rotate(-90deg)");
	$("#about-us-left-btn > img").css("transition", "all 0.4s ease");
	$("#about-us-left-btn > img").css("transform", "rotate(90deg)");
	$("#about-us-left-btn > img").css("opacity", "0.2");
	$("#about-us-left-btn").css("cursor", "default");

    function transitionAboutSlide(scrollDirection) {
        if (isAnimating) return;
        var currentSlide = aboutSlides.eq(aboutSlide);
        var currentSlideContent = aboutSlidesContent.eq(aboutSlide);
        var nextSlide = aboutSlides.eq(aboutSlide + scrollDirection);
        var nextSlideContent = aboutSlidesContent.eq(aboutSlide + scrollDirection);
        var curtain = scrollDirection == 1 ? curtainLeft : curtainRight;
        var anim = scrollDirection == 1 ? { width: '100%' } : { width: '100%', right: '0' };
        var animOut = scrollDirection == 1 ? { width: '0%', left: '100%' } : { width: '0%', right: '100%' };
        
        isAnimating = true;
        if (aboutSlide + scrollDirection >= aboutSlides.length - 1) {
            $("#about-us-right-btn > img").css({ "opacity": "0.2", "cursor": "default" });
        } else {
            $("#about-us-right-btn > img").css({ "opacity": "1", "cursor": "pointer" });
        }

        if (aboutSlide + scrollDirection >= 1) {
            $("#about-us-left-btn > img").css({ "opacity": "1", "cursor": "pointer" });
        } else {
            $("#about-us-left-btn > img").css({ "opacity": "0.2", "cursor": "default" });
        }

        readBarLength += scrollDirection;
        var readBarInc = (100 / (readBarMaxLength - 1)) * readBarLength;
        readBar.css("width", readBarInc + "%");

        curtain.animate(anim, {
            duration: 400,
            easing: 'swing',
            complete: function () {
                currentSlide.removeClass("active");
                currentSlideContent.removeClass("active");
                aboutSlide += scrollDirection;
                nextSlide.addClass("active");
                nextSlideContent.addClass("active");
                curtain.animate(animOut, {
                    duration: 400,
                    easing: 'swing',
                    complete: function () {
                        curtain.removeAttr('style');
                        isAnimating = false;
                    }
                });
            }
        });
    }

    $("#about-us-btn, #about-us-btn-nav").on("click", function () {
        if (isAnimating || curSection == 1) return;
        curSection = 0;
        moveSection(1);
    });

    $("#about-us-right-btn").on("click", function () {
        if (aboutSlide < aboutSlides.length - 1) transitionAboutSlide(1);
    });

    $("#about-us-left-btn").on("click", function () {
        if (aboutSlide > 0) transitionAboutSlide(-1);
    });
});