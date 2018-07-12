requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', 'app/router', 'app/content', 'app/site'],
function   ($, router, content, site) {
    $(document).ready(function() {
        site.then(function() {
            var s = site.responseJSON;
            for (module in s.modules) {
                for (route in s.modules[module].routes) {
                    if (route == '*') {
                        //console.log(s.modules[module].routes[route]);
                        eval(s.modules[module].routes[route]+'(s.modules[module])');
                        continue
                    }
                    router.route(route, s.modules[module].routes[route], s.modules[module]);
                }
            }
            //initial load
            router.exec();
        });
    });
});