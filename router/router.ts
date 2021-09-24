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
    selected: string
    router: Map<string, HTMLDivElement>
    constructor(option) {
        console.log(window.location.href);
        this.router = new Map<string, HTMLDivElement>();
        
        this.init();

        this.hiddenAll();

        this.router.forEach((value, key) => {
            $(`Router[switch=${key}]`).onclick = () => {
                this.hiddenAll();
                this.router.get(key).style.display = 'block';
            }
        })
    }
    init() {
        $('Router').forEach(element => {
            var tag:string = element.getAttribute('switch');
            this.router.set(tag, $(`Route[switch=${tag}]`));
        });
    }
    hiddenAll() {
        $('Switch > Route').forEach(element => {
            element.style.display = 'none';
        });
    }
}