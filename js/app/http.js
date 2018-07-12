define(['jquery'], function ($) {
    
    function Http()
    {

    }

    Http.prototype.get = function(url, context, callback) {
        $.ajax({
            url: url,
            context: context
        }).done(callback);
    }

    return new Http();
});