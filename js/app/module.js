define(['jquery', './content', './site', './template', './exec'], function($, content, site, Template, exec) {
    function Module() {

    }

    Module.prototype.actions = {

        "index": function(el, args, templatePath) {
            var t = new Template(templatePath);
            site.then(function() {
                var src = site.responseJSON.modules[args.module]['source'][args.action];
                $.ajax({
                    url: src,
                    context: document.body
                }).done(function(s) {
                    t.setVars(s);
                    t.assignVar("args", args);
                    t.assignVar('config', site.responseJSON.config);
                    t.process(function(op) {
                        el.innerHTML=op;
                        exec.postExecute();

                    });
                });
            });
        },
    }

    Module.prototype.actions['view'] 
        = Module.prototype.actions['edit'] 
        = Module.prototype.actions.index;

    Module.prototype.action = function(args) {
        console.log(args);
        var that = this;
        //app.router.route(':module', function(template) {
        site.then(function() {
            var s = site.responseJSON;
            var moduleToLoad 
                = (args.module in s.modules && 'templates' in s.modules[args.module])
                    ? args.module
                    : 'module';
        
            var templatePath = s.config.templates_path+'/'+moduleToLoad+'/'+args.action+'.jhtml'
            var e = document.querySelector('[spa-module="module"]');
            
            //todo - need to call this function using this
            //console.log(that.actions[args.action]);
            that.actions[args.action](e, args, templatePath);
        });
        
    }

    return new Module();
});
