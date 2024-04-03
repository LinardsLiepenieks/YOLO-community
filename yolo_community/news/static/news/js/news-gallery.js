$(document).ready(function() {
    

    $('.gallery_img_container img').click(function() {
        var $clickedImage = $(this);
        var $article = $clickedImage.closest('.news_article');
        var $mainImageContainer = $article.find('.article_img_container');
        var $mainImages = $mainImageContainer.find('img');

        // Remove active class from all images in the article's main container
        $mainImages.removeClass('active');

        // Add active class to the clicked image
        $clickedImage.addClass('active');

        // Update main image container with clicked image
        $mainImageContainer.empty().append($clickedImage.clone());
    });
});
