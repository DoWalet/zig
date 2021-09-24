// tsc ./router/router.ts --outFile ./router/router.js
function $(element) {
    if (typeof element === 'string') {
        var selected;
        try {
            selected = document.querySelectorAll(element);
        } catch (error) {
            if (!selected) {
                return null;
            }
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
    activeClass: Map<string, string>
    callback: Function
    constructor(option) {
        this.router = new Map<string, HTMLDivElement>();
        
        this.init(option.complete ? option.complete : null);

        this.hiddenAll();

        this.reload();

        this.bindClick();
    }
    init(callback) {
        this.callback = callback;
        this.activeClass = new Map<string, string>();
        window.addEventListener('load', this.reload.bind(this), false)
        window.addEventListener('hashchange', this.reload.bind(this), false)
        $('Router').forEach(element => {
            var tag:string = element.getAttribute('switch');
            if (element.getAttribute('activeClass')) {
                this.activeClass.set(tag, element.getAttribute('activeClass'));
            }
            this.router.set(tag, $(`Route[switch=${tag}]`));
        });
    }
    reload() {
        var location = window.location.hash.slice(2, window.location.hash.length);

        this.selected = location;

        if ($(`Router[switch=${this.selected}]`).getAttribute('active')) {
            eval($(`Router[switch=${this.selected}]`).getAttribute('active'));
        }

        if (this.callback) {
            this.callback && this.callback();
        }

        this.show(location);
    }
    show(tag) {
        this.hiddenAll();
        if (this.router.get(tag)) {
            this.router.get(tag).style.display = 'block';
        } else {
            if ($('Route[status=notfound]')) {
                $('Route[status=notfound]').style.display = 'block';
            } else {
                console.warn('do u need [status=notfound] router?');
            }
        }
    }
    bindClick() {
        this.router.forEach((value, key) => {
            $(`Router[switch=${key}]`).onclick = () => {
                this.hiddenAll();
                
                this.router.get(key).style.display = 'block';

                this.selected = key;

                window.location.hash = '#/' + key;

                console.log($(`Router[switch=${key}]`))
                if ($(`Router[switch=${key}]`).getAttribute('activeClass')) {
                    console.log($(`Router[switch=${key}]`).classList);
                    if ($(`Router[switch=${key}]`).classList.length == 0) {
                        $(`Router[switch=${key}]`).setAttribute('class', $(`Router[switch=${key}]`).getAttribute('activeClass'));
                    } else {
                        $(`Router[switch=${key}]`).classList.add($(`Router[switch=${key}]`).getAttribute('activeClass'));
                    }
                }
                
            }
        })
    }
    hiddenAll() {
        this.router.forEach((value, key) => {
            $(`Router[switch=${key}]`).classList.remove(this.activeClass.get(key))
            this.router.get(key).style.display = 'none';
        })
        if ($('Switch > Route[status]')) {
            if ($('Switch > Route[status]').length > 1) {
                $('Switch > Route[status]').forEach(element => {
                    element.style.display = 'none';
                });
            } else {
                $('Switch > Route[status]').style.display = 'none';
            }
        }
        
    }
}