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
    } else {
        return element;
    }
}
class Router {
    router: Array<string>
    route: Array<string>
    constructor(option) {
        console.log(window.location.href);
        $('Router').forEach(element => {
            console.log(element);
        });
    }
}