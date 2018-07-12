define(['./template', './site', 'jquery'], function(Template, site, $) {

    function Content() {
        this.postExecuteArr = [];
    }

    Content.prototype.render = function(args) {
        console.log(args);
        var render = args.render || 'module';
        var tmpl = args.template || 'home.jhtml';
        

        var e = document.querySelector('[spa-module="'+render+'"]');
        if (typeof e  == 'undefined' || !e) {
            return;
        }
        var resources = [];
        if ('source' in args) {
            if (Array.isArray(args['source'])) {
                for (i=0; i<args['source'].length; i++) {
                    var useas = args['source'][i]['useas'];
                    resources.push($.getJSON(args['source'][i]['resource']).then(function(d){
                        var ret = {};
                        ret[this.useas] = d;
                        return ret;
                    }.bind(args['source'][i])));
                }
            } 
        }
        var that = this;
        if (resources.length>0) {
            site.then(function() {

                $.when(...resources).done(function(...obs) {
                    var tempargs = {};
                    for (i=0; i<obs.length; i++) {
                        for (tempvar in obs[i]) {
                            tempargs[tempvar] =  obs[i][tempvar];
                        }
                    }
                    tempargs['config'] = site.responseJSON.config;
                    that.fetchInto(e, tmpl, tempargs);
                })
            });

        } else {
            site.then(function() {
                args['config'] = site.responseJSON.config;
                that.fetchInto(e, tmpl, args);
            });
        }
    };

    

    Content.prototype.fetchInto = function(el, tmpl, args) {
        site.then(function(){
            var templUrl = site.responseJSON.config.templates_path+'/'+tmpl;
            var t = new Template(templUrl);
            t.setVars(args);
            t.process(function(op) {
                el.innerHTML=op;
            });
        });
    };

    

    return new Content();
});
