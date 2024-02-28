
    const ele = document.querySelector(':root');
    const cs = getComputedStyle(ele);
    window.addMyCustomeElement('app-body', class extends Webolement {
        getContent() { return `
    <ul>
        <li><a href="/">launcher</a></li>
        <li><a href="/test">test page</a></li>
        <li><a href="/home">home page</a></li>
        <li><a href="/user">user page</a></li>
    </ul>
    <router-view></router-view>
    <modal-view :value="NeedReset" :closable="false" @closed="model_closed">
        <div style="display: flex;justify-content: center;text-align: center;flex-direction: column;">
            <img src="/img/success.png" style="margin: auto;">
            <h2>App Updated</h2>
            <p style="width: 257px;">Click below to activate new changes</p>
            <button class="btn" @click="reload"> Got It! </button>
        </div>
    </modal-view>
` }
        timeToConnectToServer = 0
        CatchList = []
        CatchListIndex = 0
        ErrorColor = cs.getPropertyValue('--error')
        WarningColor = cs.getPropertyValue('--warning')
        SuccessColor = cs.getPropertyValue('--success')
        constructor() {
            super();
        }
        showSnackbar(message, message_class) {
            // Get the snackbar DIV
            var x = document.createElement("div");
            x.classList.add("snackbar");
            x.classList.add("show");
            x.classList.add(message_class);
            x.innerText = message
            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { x.remove() }, 3000);
            document.body.appendChild(x)
        }
        model_closed() { 
            this.data.NeedReset = false
        }
        reload() {
            location.reload()
        }
        getData() {
            return {
                NeedReset: false
            }
        }
        on__load() {
            window.show_error = (message) => {
                this.showSnackbar(message, "error")
            }
            window.show_success = (message) => {
                this.showSnackbar(message, "success")
            }
            window.show_warning = (message) => {
                this.showSnackbar(message, "warning")
            }
            this.websocket = new MyWebsocket()
            window.WebolementApp = this
        }
        setServiceWorker() {
            if (this.CurrentDevice.DeviceType == "iOS") {
                this.updateCache()
            } else {
                var service_worker_link = "/firebase-messaging-sw.js"
                if (this.CurrentDevice.DeviceType != "browser") {
                    service_worker_link = "/sw.js"
                }
                if ("serviceWorker" in navigator) {
                    try {
                        navigator.serviceWorker.register(service_worker_link, {
                            scope: "/",
                            updateViaCache: "none",
                            type: "module"
                        }).then((registration) => {
                            if (this.CurrentDevice.DeviceType == "browser") {
                                if (typeof window.getFCM == 'function') {
                                    window.getFCM(registration)
                                } else {
                                    this.registration = registration
                                }
                            }
                            this.startUpdateCache(registration)
                        })
                    } catch (error) {
                        window.show_error(`Setup failed with ${error}`)
                    }
                }
            }
        }
        startUpdateCache(registration) {
            if (registration.active) {
                this.updateCache()
            } else {
                setTimeout(() => {
                    navigator.serviceWorker.getRegistration("/").then((registration) => {
                        this.startUpdateCache(registration)
                    });
                }, 1000);
            }
        }
        updateCache() {
            if (this.CatchList.length && this.CatchList.length > this.CatchListIndex) {
                var request_data = {
                    url: this.CatchList[this.CatchListIndex].Request
                }
                if (this.CurrentDevice.DeviceType == "iOS") {
                    window.webkit.messageHandlers.updateCache.postMessage(request_data).then(
                        (result) => {
                            debugger
                            return
                        },
                        (err) => {
                            debugger
                            return
                        }).finally(() => {
                            this.CatchListIndex = this.CatchList.length
                            if (this.CurrentDevice.CacheUpdatedOn < parseInt(this.CatchList[this.CatchListIndex - 1].UpdatedOn)) {
                                this.CurrentDevice.CacheUpdatedOn = parseInt(this.CatchList[this.CatchListIndex - 1].UpdatedOn)
                            }
                            this.updateCache()
                        });
                } else {
                    window.call_api("updatecache__", request_data).then((data) => {
                        if (data && data.Status == 2) {
                            if (this.CurrentDevice.CacheUpdatedOn < parseInt(this.CatchList[this.CatchListIndex].UpdatedOn)) {
                                this.CurrentDevice.CacheUpdatedOn = parseInt(this.CatchList[this.CatchListIndex].UpdatedOn)
                            }
                            this.CatchListIndex += 1
                            this.updateCache()
                        } else if (!data ||
                            data.Message == "Waiting for service worker") { location.reload() } else { this.updateCache() }
                    })
                }
            } else if (this.CatchList.length > 0) {
                if (this.CurrentDevice && this.CurrentDevice.CacheUpdatedOn) {
                    this.data.NeedReset = true
                }
                window.call_api("current_device", { "CacheUpdatedOn": this.CurrentDevice.CacheUpdatedOn })
            }
        }
    });
