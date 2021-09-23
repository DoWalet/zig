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
        console.log(window.location.href);
        $('Router').forEach(function (element) {
            console.log(element);
        });
    }
    return Router;
}());
