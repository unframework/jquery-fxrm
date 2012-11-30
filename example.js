/**
 * Sample code to submit forms via AJAX and decorate form load/error/success.
 */
$(function() {
    $('body').fxrm('json');

    // when loading, add decorative class and remove again on error (but not on success)
    $('body').delegate('form', 'fxrm:loading', function() {
        $(this).addClass('loading');
        $(this).one('fxrm:error', function() { $(this).removeClass('loading') });
    });

    // on error, display error message from the server; clean up when re-submitted
    $('body').delegate('form', 'fxrm:error', function(e, data) {
        var error = $('<div class="alert-message error">An application error has occurred</div>');
        error.text(data);

        $(this).prepend(error.hide().fadeIn());
        $(this).one('fxrm:loading', function() { error.remove() });
    });

    // handle form success
    $('body').delegate('form', 'fxrm:action', function(e, data) {
        // look for *.success and if it is found, remove all other form content
        $(this).children('.success').fadeIn().siblings().remove();

        // if *.success has links, replace '$' (dollar signs) in link HREFs with returned data
        var successLinks = $(this).children('.success').find('a');
        successLinks.each(function() {
            $(this).attr('href', $(this).attr('href').replace('$', encodeURIComponent(data)));
        });

        // if *.success has exactly one link, auto-click on it after a sensible delay
        if(successLinks.length == 1)
            setTimeout(function() { location.href = successLinks.attr('href') }, 300);
    });
});