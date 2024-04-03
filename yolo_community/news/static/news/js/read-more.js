$(document).ready(function() {
    $('.content-container').each(function() {
        var content = $(this).find('p');
        var btn = $(this).find('.read-more-btn');

        if (content[0].scrollHeight > content.innerHeight()) {
            btn.show();
        }
        else{
            btn.hide();
        }

        btn.click(function() {
            content.css('display', 'inline');
            btn.hide();
        });
    });
});
