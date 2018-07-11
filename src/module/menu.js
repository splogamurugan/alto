function ModuleMenu() {

}

ModuleMenu.prototype.render = function() {
    
    app.$.ajax({
        url: "./server/menu.json",
        context: document.body
    }).done(function(d) {
        var e = document.querySelector('[spa-module="menu"]');
        var t = new Template(app.site.config.templates_path+'/menu.jhtml');
        t.assignVar('menu', d);
        t.process(function(op) {
            e.innerHTML=op;
        });

    });
};

;(function(app, m) {
    app.module.menu = m; 
})(app, new ModuleMenu());
