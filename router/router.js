// tsc ./router/router.ts --outFile ./router/router.js
function $(element) {
    if (typeof element === 'string') {
        var selected;
        try {
            selected = document.querySelectorAll(element);
        }
        catch (error) {
            if (!selected) {
                return null;
            }
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
        this.router = new Map();
        this.init(option.complete ? option.complete : null);
        this.hiddenAll();
        this.reload();
        this.bindClick();
    }
    Router.prototype.init = function (callback) {
        var _this = this;
        this.callback = callback;
        this.activeClass = new Map();
        window.addEventListener('load', this.reload.bind(this), false);
        window.addEventListener('hashchange', this.reload.bind(this), false);
        $('Router').forEach(function (element) {
            var tag = element.getAttribute('switch');
            if (element.getAttribute('activeClass')) {
                _this.activeClass.set(tag, element.getAttribute('activeClass'));
            }
            _this.router.set(tag, $("Route[switch=" + tag + "]"));
        });
    };
    Router.prototype.reload = function () {
        var location = window.location.hash.slice(2, window.location.hash.length);
        this.selected = location;
        console.log(this.selected);
        if ($("Router[switch=" + this.selected + "]").getAttribute('activeClass')) {
            console.log('in', this.activeClass.get(this.selected));
            $("Router[switch=" + this.selected + "]").classList.add(this.activeClass.get(this.selected));
        }
        if ($("Router[switch=" + this.selected + "]").getAttribute('active')) {
            eval($("Router[switch=" + this.selected + "]").getAttribute('active'));
        }
        if (this.callback) {
            this.callback && this.callback();
        }
        this.show(location);
    };
    Router.prototype.show = function (tag) {
        this.hiddenAll();
        if (this.router.get(tag)) {
            this.router.get(tag).style.display = 'block';
        }
        else {
            if ($('Route[status=notfound]')) {
                $('Route[status=notfound]').style.display = 'block';
            }
            else {
                console.warn('do u need [status=notfound] router?');
            }
        }
    };
    Router.prototype.bindClick = function () {
        var _this = this;
        this.router.forEach(function (value, key) {
            $("Router[switch=" + key + "]").onclick = function () {
                _this.hiddenAll();
                _this.router.get(key).style.display = 'block';
                _this.selected = key;
                window.location.hash = '#/' + key;
            };
        });
    };
    Router.prototype.hiddenAll = function () {
        var _this = this;
        this.router.forEach(function (value, key) {
            $("Router[switch=" + key + "]").classList.remove(_this.activeClass.get(key));
            _this.router.get(key).style.display = 'none';
        });
        if ($('Switch > Route[status]')) {
            if ($('Switch > Route[status]').length > 1) {
                $('Switch > Route[status]').forEach(function (element) {
                    element.style.display = 'none';
                });
            }
            else {
                $('Switch > Route[status]').style.display = 'none';
            }
        }
    };
    return Router;
}());
