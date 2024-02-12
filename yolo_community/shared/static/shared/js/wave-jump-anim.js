$(document).ready(function () {
	const letters = $(".wave-animation").find("*");
	const animationClass = "wave-animation-item";
	const animationDuration = 500; // Duration of animation in milliseconds
	const delayBetweenLetters = 100; // Delay between adding animation to each letter (in milliseconds)

	function addAnimationToLetter(index) {
		letters.each(function (index) {
			const currentLetter = $(this);
			if (currentLetter.text().trim() === " ") {
				return true;
			}

			setTimeout(function () {
				currentLetter.addClass(animationClass);
			}, index * delayBetweenLetters);

			setTimeout(function () {
				currentLetter.removeClass(animationClass);
			}, index * delayBetweenLetters + animationDuration);
		});
	}

	$(".wave-animation").hover(function () {
		addAnimationToLetter(0);
	});
});
