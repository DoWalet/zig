// tsc ./router/router.ts --outFile ./router/router.js
function $(element) {
    if (typeof element === 'string') {
        var selected = document.querySelectorAll(element);
        if (!selected) {
            console.log('Cannot find element: ' + element);
            return document.createElement('div');
        }
        if (selected.length == 1) {
            return selected[0];
        }
        return selected;
    }
    else {
        return element;
    }
}
var Router = /** @class */ (function () {
    function Router(option) {
        var _this = this;
        console.log(window.location.href);
        this.router = new Map();
        this.init();
        this.hiddenAll();
        this.router.forEach(function (value, key) {
            $("Router[switch=" + key + "]").onclick = function () {
                _this.hiddenAll();
                _this.router.get(key).style.display = 'block';
            };
        });
    }
    Router.prototype.init = function () {
        var _this = this;
        $('Router').forEach(function (element) {
            var tag = element.getAttribute('switch');
            _this.router.set(tag, $("Route[switch=" + tag + "]"));
        });
    };
    Router.prototype.hiddenAll = function () {
        $('Switch > Route').forEach(function (element) {
            element.style.display = 'none';
        });
    };
    return Router;
}());
