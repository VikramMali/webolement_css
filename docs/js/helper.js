const zeroPad = (num, places) => String(num).padStart(places, '0')
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
const dayFullNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
function isANumber(str) {
    return !/\D/.test(str);
}

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
}

window.addMyCustomeElement = (name, elevent_class) => {
    if (customElements.get(name) === undefined) window.customElements.define(name, elevent_class);
}

window.getFullDateTime = (timestamp) => {
    var date
    if (!timestamp) {
        return "Unknown"
    }
    if (isANumber(timestamp)) {
        timestamp = parseInt(timestamp)
        date = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date.setUTCSeconds(timestamp);
    } else if (typeof (timestamp) == 'string') {
        date = (new Date(timestamp))
    } else if (typeof (timestamp) == "object") {
        date = timestamp
    } else if (timestamp == 0 || timestamp == undefined || timestamp == "") {
        return "Unknown"
    } else {
        date = (new Date(timestamp * 1000))
    }
    return months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " - " + (date.getHours() % 12).toString() + ":" + date.getMinutes() + (((date.getHours() / 12) > 1) ? "PM" : "AM")
}

window.getFullDate = (timestamp) => {
    var date
    if (!timestamp) {
        return "Unknown"
    }
    if (isANumber(timestamp)) {
        timestamp = parseInt(timestamp)
        date = (new Date(timestamp * 1000))
    } else if (typeof (timestamp) == 'string') {
        date = (new Date(timestamp))
    } else if (typeof (timestamp) == "object") {
        date = timestamp
    } else if (timestamp == 0 || timestamp == undefined || timestamp == "") {
        return "Unknown"
    } else {
        date = (new Date(timestamp * 1000))
    }
    return months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()
}

window.getShortDate = (timestamp) => {
    var date
    if (!timestamp) {
        return "Unknown"
    }
    if (isANumber(timestamp)) {
        timestamp = parseInt(timestamp)
        date = (new Date(timestamp * 1000))
    } else if (typeof (timestamp) == 'string') {
        date = (new Date(timestamp))
    } else if (typeof (timestamp) == "object") {
        date = timestamp
    } else if (timestamp == 0 || timestamp == undefined || timestamp == "") {
        return "Unknown"
    } else {
        date = (new Date(timestamp * 1000))
    }
    return months[date.getMonth()] + " " + date.getDate()
}

window.getTime = (timestamp) => {
    var date
    if (!timestamp) {
        return "Unknown"
    }
    if (isANumber(timestamp)) {
        timestamp = parseInt(timestamp)
        date = (new Date(timestamp * 1000))
    } else if (typeof (timestamp) == 'string') {
        date = (new Date(timestamp))
    } else if (typeof (timestamp) == "object") {
        date = timestamp
    } else if (timestamp == 0 || timestamp == undefined || timestamp == "") {
        return "Unknown"
    }
    var hour = date.getHours() % 12
    if (!hour) {
        hour = 12
    }
    return zeroPad(hour, 2) + ":" + zeroPad(date.getMinutes(), 2) + ((((date.getHours() + 1) / 12) > 1) ? "PM" : "AM")
}

window.getTimeWithSeconds = (timestamp) => {
    var hours = Math.floor(timestamp / 3600)
    var one_hour_timestamp = timestamp % 3600
    var minuts = Math.floor(one_hour_timestamp / 60)
    var seconds = one_hour_timestamp % 60
    if (hours > 0) {
        return (zeroPad(hours, 2)).toString() + ":" + (zeroPad(minuts, 2)).toString() + ":" + (zeroPad(seconds, 2)).toString()
    }
    return (zeroPad(minuts, 2)).toString() + ":" + (zeroPad(seconds, 2)).toString()
}

function getSeconds(value) {
    var seconds = value
    if (seconds > 1000) {
        seconds = seconds / 1000
    } else {
        seconds = 0
    }
    return seconds
}

String.prototype.trimStart = function (charlist) {
    if (!charlist && charlist != "0") charlist = " ";
    return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

String.prototype.trimEnd = function (charlist) {
    if (!charlist && charlist != "0") charlist = " ";
    return this.replace(new RegExp("[" + charlist + "]+$"), "");
};

String.prototype.trim = function (charlist) {
    return this.trimStart(charlist).trimEnd(charlist);
};

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, newStr) {

        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }

        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);

    };
}

function isEmpty(value) {
    if (value == undefined || value == null || value == 0 || value == "") {
        return true
    } else {
        return false
    }
}

const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}

function add_route_change_event_handler(handler) {
    if (!window.RouteChangeEventHandlers) {
        window.RouteChangeEventHandlers = []
    }
    window.RouteChangeEventHandlers.push(handler)
    return window.RouteChangeEventHandlers.length - 1
}

function remove_route_change_event_handler(index_to_delete){
    if (window.RouteChangeEventHandlers && index_to_delete > -1){
        window.RouteChangeEventHandlers.splice(index_to_delete, 1);
    }
}

function loadwebcomponents(name, link) {
    return new Promise((resolve, reject) => {
        if (customElements.get(name) === void 0) {
            const script = document.createElement('script');
            script.onload = (link) => {
                resolve(true);
            };
            script.src = link;
            script.type = "module";
            script.id = name;
            document.body.appendChild(script);
        } else {
            resolve(true);
        }
    });
}

function loadstyle(name, link_url, component) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(name) == null) {
            const link = document.createElement('link');
            link.onload = (link) => {
                resolve(true);
            };
            // type="text/css" rel="stylesheet" href="/css/style.css?v=1"
            link.href = link_url;
            link.rel = "stylesheet"
            link.type = "text/css";
            link.id = name;
            component.appendChild(link);
        } else {
            resolve(true);
        }
    });
}

function loadjs(name, link) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(name) == null) {
            const script = document.createElement('script');
            script.onload = (link) => {
                resolve(true);
            };
            script.src = link;
            script.id = name;
            document.body.appendChild(script);
        } else {
            resolve(true);
        }
    });
}

function getColumnName(column) {
    var columnTitle = ""
    if (column.title) {
        columnTitle = column.title
    } else if (column.key) {
        columnTitle = column.key
    } else {
        columnTitle = column
    }
    if (columnTitle) {
        //columnTitle = _.camelCase(columnTitle)
        columnTitle = columnTitle.replaceAll("_", " ")
        columnTitle = columnTitle.replace(/([a-z])([A-Z])/g, '$1 $2');
        //columnTitle = columnTitle.replace("_", ' ').trim()
    } else {
        debugger
    }
    return columnTitle
}

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


var startX,
    startY,
    dist,
    threshold = 100, //required min distance traveled to be considered swipe
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime;

window.addEventListener('touchstart', function (event) {
    //touchsurface.innerHTML = ''
    var touchobj = event.changedTouches[0]
    dist = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime() // record time when finger first makes contact with surface
    //e.preventDefault()

    // event.target.addEventListener('touchmove', function(e){
    //     e.preventDefault() // prevent scrolling when inside DIV
    // }, false)

    event.target.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)

        var dir_str = "none";
        var dir_int = 0;
        if (swiperightBol) {
            if (dist > 0) {
                dir_str = "right";
                dir_int = 1;
            } else {
                dir_str = "left";
                dir_int = 2;
            }

            var _e = new CustomEvent("swap", {
                target: event.target,
                detail: {
                    direction: dir_str,
                    direction_int: dir_int
                },
                bubbles: true,
                cancelable: true
            });

            if (window.SwapEventHandlers && window.SwapEventHandlers) {
                for (let index = 0; index < window.SwapEventHandlers.length; index++) {
                    window.SwapEventHandlers[index](_e);
                }
            }
        }

        //handleswipe(swiperightBol, event.target);
        //event.preventDefault()
    }, false)

    function trigger(elem, name, event) {

        elem.dispatchEvent(event);
        eval(elem.getAttribute('on' + name));
    }

}, false)

window.add_swap_event_handler = (handler) => {
    if (!window.SwapEventHandlers) {
        window.SwapEventHandlers = []
    }
    window.SwapEventHandlers.push(handler)
    return window.SwapEventHandlers.length - 1
}
window.remove_swap_event_handler = (index_to_delete) => {
    if (!window.SwapEventHandlers) {
        return
    }
    if (index_to_delete > -1) {
        window.SwapEventHandlers.splice(index_to_delete, 1);
    }
}

window.setTheme = (theme_name) => {
    localStorage.setItem("theme_name", theme_name)
    switch (theme_name) {
        case "light":
            document.body.classList.remove('dark');
            break;
        case "dark":
            document.body.classList.add('dark');
            break;
        default:
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            break;
    }
}

(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "AIzaSyBirraiU6pHBLAUMjib6m-XH6E83npWHt4",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});