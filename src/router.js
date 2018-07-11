function Router() {
    this.routes = [];
    window.addEventListener('hashchange', (function() {this.exec()}).bind(this));
}

Router.prototype.exec = function() {
    var url = location.hash.slice(1);
    for (var i = 0; i < this.routes.length; i++) {  
        var found = url.match(this.routes[i].path);
        console.log(url, found);
        var urlVars = this.routes[i].url.replace(new RegExp(':', 'g'), '');
        var routeVars = urlVars.match(this.routes[i].path).slice(1);
        if (found) { // parsed successfully
            found = found.slice(1);
            args = {};
            for (j=0; j<routeVars.length; j++) {
                args[routeVars[j]] = found[j];
            }
            eval(this.routes[i].callback+'(args)');
        }
    }
}

Router.prototype.route = function(url, callbacks) {
    var path = new RegExp("^" + url.replace(/:[^\s/]+/g, '([\\w-]+)') + "$")
    this.routes.push({"url": url, "path":path, "callback": callbacks});
    
    return this;
}



