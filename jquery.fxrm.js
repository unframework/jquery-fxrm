/*!
* jQuery Fxrm Plugin
* https://github.com/unframework/jquery-fxrm
*
* Copyright 2012, Nick Matantsev
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/

/**
 * Make forms submit via AJAX.
 */
$.fn.fxrm = function(dataType) {

    this.delegate('form[method=post]', 'submit', function(e) {
        e.preventDefault(); // prevent browser submit

        var form = $(this);

        // disable the form
        var dummySubmitHandler = function(e) { e.preventDefault(); return false };
        form.bind('submit', dummySubmitHandler);

        // notify decorators
        form.trigger('fxrm:loading');

        $.ajax(form.attr('action'), {
            type: 'POST', dataType: dataType,
            data: form.serializeArray(),

            success: function(data) {
                // notify decorators of success without re-enabling the form
                form.trigger('fxrm:action', data)
            },
            error: function(xhr) {
                // re-enable the form
                form.unbind('submit', dummySubmitHandler);
                
                // notify decorators of error
                form.trigger('fxrm:error', xhr.responseText);
            }
        });

        return false; // prevent browser submit
    });
    
    return this;
};
