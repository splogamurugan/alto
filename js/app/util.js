define(
    function Util() {

    }

    Util.prototype.functionFromString = function(str) {

        var callbackPath = str.split('.');
        //console.log(callbackPath);
        var fn = window[callbackPath[0]];
        for (i=1; i<callbackPath.length; i++) {
            fn = fn[callbackPath[i]];
            //console.log(fn);
        }
        ///console.log(fn);
        return fn;

    }

    return new Util()
}