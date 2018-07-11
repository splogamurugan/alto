function Http()
{

}

Http.prototype.get = function(url, context, callback) {
    app.$.ajax({
        url: url,
        context: context
    }).done(callback);
}