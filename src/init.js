var app = (function(app, j, r) {
    app.$ = j;
    app.router = r;
    app.site   = null;
    
    app.$(document).ready(function() {
        app.$.ajax({
            url: "./server/site.json",
            context: document.body
        }).done(function(s) {
            app.site = s;
            for (module in s.modules) {
                for (param in s.modules[module].routes) {
                    if (param == '*') {
                        app.util.functionFromString(s.modules[module].routes[param])();
                        continue
                    }
                    app.router.route(param, s.modules[module].routes[param]);
                }
            }
            //initial load
            app.router.exec();
        });
        
        
    });
    
    return app;
})(new App(), jQuery.noConflict(), new Router());