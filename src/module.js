function Module() {

}

Module.prototype.actions = {

    "index": function(el, args, templatePath) {
        var t = new Template(templatePath);
        var src = app.site.modules[args.module]['source'][args.action];
        app.$.ajax({
            url: src,
            context: document.body
        }).done(function(s) {
            t.setVars(s);
            t.assignVar("args", args);
            t.process(function(op) {
                el.innerHTML=op;
                app.content.postExecute();

            });
        });
    },

}

Module.prototype.actions['view'] = Module.prototype.actions.index
Module.prototype.actions['edit'] = Module.prototype.actions.index


Module.prototype.action = function(args) {
    console.log(args);
    //app.router.route(':module', function(template) {
    var moduleToLoad 
        = (args.module in app.site.modules && 'templates' in app.site.modules[args.module])
            ? args.module
            : 'module';
    var templatePath = app.site.config.templates_path+'/'+moduleToLoad+'/'+args.action+'.jhtml'
    var e = document.querySelector('[spa-module="module"]');
    
    //todo - need to call this function using this
    this.actions[args.action](e, args, templatePath);
    
}

;(function(app, m) {
    app.module = m; 
})(app, new Module());