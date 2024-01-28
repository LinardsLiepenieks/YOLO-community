document.addEventListener("DOMContentLoaded", function () {
	// Get all the images
	var images = document.querySelectorAll(".landing-bg-img");

	// Set the initial image index
	var currentIndex = images.length - 1;

	// Function to show the next image
	function showNextImage() {
		// Get the current image and the next image
		var currentImage = images[currentIndex];
		currentIndex = (currentIndex + 1) % images.length;
		var nextImage = images[currentIndex];

		// Set initial opacity for the next image
		nextImage.style.opacity = 0;
		nextImage.style.display = "block";
		nextImage.style.zIndex = 2;
		currentImage.style.zIndex = 1;

		// Gradually change opacity for a smooth crossfade effect
		var opacity = 0;
		var fadeInterval = setInterval(function () {
			opacity += 0.01;
			//currentImage.style.opacity = 1 - opacity;
			nextImage.style.opacity = opacity;

			// Check if the transition is complete
			if (opacity >= 1) {
				currentImage.style.display = "none";
				clearInterval(fadeInterval);
			}
		}, 10);
	}

	// Set an interval to switch images every 5 seconds (adjust as needed)
	setInterval(showNextImage, 5000);
});
