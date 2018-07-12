define(function(){
    function Exec()
    {
        this.postExecuteArr=[];
    }

    Exec.prototype.postRender = function(scriptToExec) {
        this.postExecuteArr.push(scriptToExec);
    }
    
    Exec.prototype.postExecute = function() {
        var that = this;
        require(['./app/content'], function(content) {
            while (ex = that.postExecuteArr.pop()) {
                eval(ex);
            }
        });
    
    }

    return new Exec();

})
