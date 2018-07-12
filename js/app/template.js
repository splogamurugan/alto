define (['./http', './exec'], function(http, exec) {
    
    
    function Template(template)
    {
        this.template = template;
        this.templatePre = 'spa-template-';
        this.tvars = {};
    }

    Template.prototype.getVar = function(tvar) {
        return this.tvars[tvar]
    }

    Template.prototype.getVars = function() {
        return this.tvars;
    }

    Template.prototype.assignVar = function(tvar, tval) {
        this.tvars[tvar] = tval;
    }

    //beware of https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
    Template.prototype.setVars = function(tvars) {
        this.tvars = tvars;
    }


    Template.prototype.parse = function(s, callback) {

        
        /** landing the variables here */
        let vars = this.getVars();
        for (e in vars) {
            var value = (typeof vars[e] == 'object') 
                ? JSON.stringify(vars[e]) 
                : isNaN(vars[e])?'\''+vars[e]+'\'':vars[e];
            var vardec = 'var '+e+' = '+value+';';
            console.log(vardec);
            eval(vardec);
        }

        var ex = s.split('<?js');
        var str = "st='';";
        for (i=0; i<ex.length; i++) {
            //console.log(ex[i]);
            if (ex[i].indexOf('?>') === -1) {
                str += "st+='"+ex[i]+'\';'; 
            } else {
                exn = ex[i].split('?>');
                if (exn[0].indexOf('=') === 0) {
                    str += "st+="+exn[0].substring(1,exn[0].length) +';'; //to print
                } else {
                    str += exn[0]; //js stuff
                }
                str += "st+='"+exn[1]+'\';'; //html stuf
            }
        }
        str = str.replace(/(\r\n\t|\n|\r\t)/gm,"");
        console.log(str);
        eval(str);
        callback(st);
    }

    Template.prototype.cache = function(t) {
        var el = document.createElement('div');
        el.setAttribute('id', this.templatePre+this.template);
        el.setAttribute('style', 'display:none');
        el.innerHTML = t;
        document.body.appendChild(el);
    }

    Template.prototype.process = function(callback) {
        var that = this;
        http.get(this.template, document.body, function(t) {
            that.parse(t, callback);
        });
    }

    return Template;
})