define(['./http'], function(http) {
    return http.getJSON('./server/site.json');
});