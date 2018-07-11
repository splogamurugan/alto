function Content() {
    this.postExecuteArr = [];
}

Content.prototype.render = function() {
    var e = document.querySelector('[spa-module="module"]');
    var t = new Template(app.site.config.templates_path+'/home.jhtml');
    t.setVars({});
    t.process(function(op) {
        e.innerHTML=op;
    });
};

Content.prototype.fetchInto = function(el, tmpl, args) {
    var t = new Template(tmpl);
    t.setVars(args);
    t.process(function(op) {
        el.innerHTML=op;
        
    });
};

Content.prototype.postRender = function(scriptToExec) {
    this.postExecuteArr.push(scriptToExec);
}

Content.prototype.postExecute = function() {

    while (ex = this.postExecuteArr.pop()) {
        eval(ex);
    }

}

;(function(app, m) {
    app.content = m; 
})(app, new Content());
