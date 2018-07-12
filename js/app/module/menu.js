define(['jquery', '../template', '../site'], function($, Template, site) {
    function ModuleMenu() {

    }

    ModuleMenu.prototype.render = function() {
        
        $.ajax({
            url: "./server/menu.json",
            context: document.body
        }).done(function(d) {
            var e = document.querySelector('[spa-module="menu"]');
            site.then(function(){
                var t = new Template(site.responseJSON.config.templates_path+'/menu.jhtml');
                t.assignVar('menu', d);
                t.assignVar('site', site.responseJSON);
                t.process(function(op) {
                    e.innerHTML=op;
                });
            });

        });
    };

    return new ModuleMenu();
});
