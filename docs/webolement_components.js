

    const ele = document.querySelector(':root');
    const cs = getComputedStyle(ele);
    window.addMyCustomeElement('app-body', class extends Webolement {
        getContent() { return `
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


    window.addMyCustomeElement('dashboard-div', class extends Webolement {
        getContent() { return `
    <div if="tab=='dashboard'">
        <nav style="position: sticky;top: -53px;background: var(--bg-color);padding: 1em 1em 0 1em;">
            <div class="flex row middle">
                <img :src="CurrentOrganization.Logo" alt="" class="logo">
                <h3 class="flex-1" style="margin: 0;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                    :text="CurrentOrganization.Name">
                    Kumar Enterprises Pvt. Ltd.
                </h3>
                <a href="/account_settings">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.9454 6.83491L16.3204 7.48443V7.48443L15.9454 6.83491ZM18.6774 7.56696L19.3269 7.19196V7.19196L18.6774 7.56696ZM19.1774 8.43299L18.5279 8.80799L19.1774 8.43299ZM18.4454 11.165L18.8204 11.8146L18.4454 11.165ZM18.4454 12.8349L18.0704 13.4844L18.4454 12.8349ZM19.1774 15.567L19.827 15.942L19.1774 15.567ZM18.6774 16.433L18.0279 16.058L18.6774 16.433ZM15.9454 17.165L16.3204 16.5155L15.9454 17.165ZM8.05307 17.165L7.67807 16.5155H7.67807L8.05307 17.165ZM5.32102 16.433L5.97054 16.058H5.97054L5.32102 16.433ZM4.82102 15.567L4.1715 15.942H4.1715L4.82102 15.567ZM5.55307 12.8349L5.17807 12.1854H5.17807L5.55307 12.8349ZM5.55309 11.165L5.17809 11.8146H5.17809L5.55309 11.165ZM4.82104 8.43299L4.17152 8.05799H4.17152L4.82104 8.43299ZM5.32104 7.56696L5.97056 7.94196L5.32104 7.56696ZM8.05309 6.83491L7.67809 7.48443L8.05309 6.83491ZM11.4991 3.25C9.98036 3.25 8.74914 4.48122 8.74914 6H10.2491C10.2491 5.30964 10.8088 4.75 11.4991 4.75V3.25ZM12.4991 3.25H11.4991V4.75H12.4991V3.25ZM15.2491 6C15.2491 4.48122 14.0179 3.25 12.4991 3.25V4.75C13.1895 4.75 13.7491 5.30964 13.7491 6H15.2491ZM19.3269 7.19196C18.5676 5.87666 16.8857 5.426 15.5704 6.18539L16.3204 7.48443C16.9182 7.13925 17.6827 7.3441 18.0279 7.94196L19.3269 7.19196ZM19.8269 8.05799L19.3269 7.19196L18.0279 7.94196L18.5279 8.80799L19.8269 8.05799ZM18.8204 11.8146C20.1357 11.0552 20.5863 9.37329 19.8269 8.05799L18.5279 8.80799C18.8731 9.40585 18.6682 10.1703 18.0704 10.5155L18.8204 11.8146ZM19.827 15.942C20.5864 14.6267 20.1357 12.9448 18.8204 12.1854L18.0704 13.4844C18.6683 13.8296 18.8731 14.5941 18.5279 15.192L19.827 15.942ZM19.327 16.808L19.827 15.942L18.5279 15.192L18.0279 16.058L19.327 16.808ZM15.5704 17.8146C16.8857 18.5739 18.5676 18.1233 19.327 16.808L18.0279 16.058C17.6828 16.6559 16.9183 16.8607 16.3204 16.5155L15.5704 17.8146ZM12.4991 20.75C14.0179 20.75 15.2491 19.5188 15.2491 18H13.7491C13.7491 18.6904 13.1895 19.25 12.4991 19.25V20.75ZM11.4991 20.75H12.4991V19.25H11.4991V20.75ZM8.74914 18C8.74914 19.5188 9.98036 20.75 11.4991 20.75V19.25C10.8088 19.25 10.2491 18.6904 10.2491 18H8.74914ZM4.6715 16.808C5.43089 18.1233 7.11276 18.574 8.42807 17.8146L7.67807 16.5155C7.0802 16.8607 6.31571 16.6559 5.97054 16.058L4.6715 16.808ZM4.1715 15.942L4.6715 16.808L5.97054 16.058L5.47054 15.192L4.1715 15.942ZM5.17807 12.1854C3.86276 12.9448 3.41211 14.6267 4.1715 15.942L5.47054 15.192C5.12536 14.5941 5.3302 13.8296 5.92807 13.4844L5.17807 12.1854ZM4.17152 8.05799C3.41213 9.37329 3.86279 11.0552 5.17809 11.8146L5.92809 10.5155C5.33023 10.1703 5.12538 9.40585 5.47056 8.80799L4.17152 8.05799ZM4.67152 7.19196L4.17152 8.05799L5.47056 8.80799L5.97056 7.94196L4.67152 7.19196ZM8.42809 6.18539C7.11279 5.426 5.43091 5.87666 4.67152 7.19196L5.97056 7.94196C6.31574 7.3441 7.08023 7.13925 7.67809 7.48443L8.42809 6.18539ZM7.67809 7.48443C8.82082 8.14419 10.2491 7.31942 10.2491 6H8.74914C8.74914 6.16481 8.57074 6.26775 8.42809 6.18539L7.67809 7.48443ZM5.92807 13.4844C7.07077 12.8247 7.07085 11.1753 5.92809 10.5155L5.17809 11.8146C5.32079 11.8969 5.32083 12.103 5.17807 12.1854L5.92807 13.4844ZM10.2491 18C10.2491 16.6806 8.82085 15.8557 7.67807 16.5155L8.42807 17.8146C8.57069 17.7322 8.74914 17.8351 8.74914 18H10.2491ZM16.3204 16.5155C15.1777 15.8558 13.7491 16.6804 13.7491 18H15.2491C15.2491 17.8352 15.4276 17.7321 15.5704 17.8146L16.3204 16.5155ZM18.0704 10.5155C16.9276 11.1753 16.9277 12.8247 18.0704 13.4844L18.8204 12.1854C18.6776 12.103 18.6777 11.8969 18.8204 11.8146L18.0704 10.5155ZM13.7491 6C13.7491 7.31962 15.1777 8.14415 16.3204 7.48443L15.5704 6.18539C15.4275 6.26785 15.2491 6.16473 15.2491 6H13.7491ZM13.431 11.9999C13.431 12.7907 12.79 13.4318 11.9992 13.4318V14.9318C13.6184 14.9318 14.931 13.6191 14.931 11.9999H13.431ZM11.9992 13.4318C11.2084 13.4318 10.5674 12.7907 10.5674 11.9999H9.06738C9.06738 13.6191 10.38 14.9318 11.9992 14.9318V13.4318ZM10.5674 11.9999C10.5674 11.2092 11.2084 10.5681 11.9992 10.5681V9.06812C10.38 9.06812 9.06738 10.3807 9.06738 11.9999H10.5674ZM11.9992 10.5681C12.79 10.5681 13.431 11.2092 13.431 11.9999H14.931C14.931 10.3807 13.6184 9.06812 11.9992 9.06812V10.5681Z"
                            fill="currentColor" />
                    </svg>
                </a>
            </div>
            <div class="flex column" style="width: 100%;">
                <p>Welcome, 
                    
                    <span :text="CurrentUser.Name"></span> <span class="sub mute"
                        if="CurrentOrganization.OwnerID == CurrentUser.ID">(Owner)</span> </p>
                <p if="CurrentEmployee" class="sub mute">
                    (<span :text="CurrentEmployee.Position"></span> <span if="CurrentBranch" :text="'@ '+CurrentBranch.Name"></span>)
                </p>
            </div>
        </nav>
        <div class="p-1" style="padding-bottom: 100px;">
            <notification-access></notification-access>
            <today-status></today-status>
        </div>
    </div>
    <employees-div if="tab=='employees'"></employees-div>
    <div class="bottom-bar">
        <a :class="tab=='dashboard'?'active':''" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                    d="M1.00001 8C1.00001 7.37049 1.2964 6.77771 1.80001 6.4L7.80001 1.9C8.51112 1.36667 9.4889 1.36667 10.2 1.9L16.2 6.4C16.7036 6.77771 17 7.37049 17 8V14C17 15.6569 15.6569 17 14 17H4C2.34314 17 0.999998 15.6569 1 14L1.00001 8Z"
                    stroke="currentColor" stroke-width="1.5" />
            </svg>
            Home
        </a>
        <a :class="tab=='employees'?'active':''" href="/employees">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                    d="M16.6593 16.5C16.6593 16.5 16.999 15.748 16.999 15C16.999 13.8403 16.499 13 15.499 12.5M12.999 7.88931C14.1763 7.37495 14.9991 6.20022 14.9991 4.83333C14.9991 3.46645 14.1763 2.29172 12.999 1.77735M10.699 4.83333C10.699 6.67428 9.20666 8.16667 7.36571 8.16667C5.52476 8.16667 4.03238 6.67428 4.03238 4.83333C4.03238 2.99238 5.52476 1.5 7.36571 1.5C9.20666 1.5 10.699 2.99238 10.699 4.83333ZM7.26154 11.8125C10.447 11.8125 12.4298 13.2075 13.3735 14.1016C13.8121 14.5171 13.8445 15.1673 13.5483 15.6938C13.2682 16.1918 12.7413 16.5 12.1699 16.5H2.58748C2.00006 16.5 1.45832 16.1832 1.17033 15.6712C0.879641 15.1544 0.895407 14.5184 1.31226 14.0967C2.19631 13.2025 4.08186 11.8125 7.26154 11.8125Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Employees
        </a>
    </div>
` }
        getData() {
            return {
                tab: "dashboard",
                CurrentDevice: false,
                CurrentUser: false,
                CurrentOrganization: false,
                CurrentEmployee: false,
                CurrentBranch: false,
                Today: new Date(),
                FormattedDate: "",
            }
        }
        on__load() {
            if (window.WebolementApp.CurrentDevice) {
                this.data.CurrentDevice = JSON.parse(JSON.stringify(window.WebolementApp.CurrentDevice))
            }
            if (window.WebolementApp.CurrentUser) {
                this.data.CurrentUser = JSON.parse(JSON.stringify(window.WebolementApp.CurrentUser))
            }
            if (window.WebolementApp.CurrentOrganization) {
                this.data.CurrentOrganization = JSON.parse(JSON.stringify(window.WebolementApp.CurrentOrganization))
            }
            if (window.WebolementApp.CurrentEmployee) {
                this.data.CurrentEmployee = JSON.parse(JSON.stringify(window.WebolementApp.CurrentEmployee))
            }
            if (window.WebolementApp.CurrentBranch) {
                this.data.CurrentBranch = JSON.parse(JSON.stringify(window.WebolementApp.CurrentBranch))
            }
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            // Format the date using the "en-US" locale
            this.data.FormattedDate = today.toLocaleDateString('en-IN', options);

            if (location.pathname.includes("dashboard")) {
                this.data.tab = "dashboard"
            } else if (location.pathname.includes("employees")) {
                this.data.tab = "employees"
            }
            console.log(this.data.tab)
        }
        onsubmit(e) {
            e.preventDefault()
            e.stopPropagation()
            if (this.data.submited) {
                window.webe_navigate("/employes")
            } else {
                this.data.submited = true
            }
        }
    });


    window.addMyCustomeElement('dashboardtest-div', class extends Webolement {
        getContent() { return `
    <div class="flex column g-1">
        <div :text=""></div>
        <div :text=""></div>
        <div :text=""></div>
    </div>
` }
        getData() {
            debugger
            return {
                tab: "dashboard",
                Device : window.CodBellApp.Device,
                User : window.CodBellApp.User,
                Organization : window.CodBellApp.Organization,
            }
        }
        on__load() {
        }
    });


    window.addMyCustomeElement('home-div', class extends Webolement {
        getContent() { return `
    <dashboard-div if="CurrentOrganization && CurrentOrganization.OwnerID == CurrentUser.ID"></dashboard-div>
    <employee-dashboard if="CurrentOrganization && CurrentOrganization.OwnerID != CurrentUser.ID && CurrentEmployee && CurrentEmployee.ID"></employee-dashboard>
    <div if="!CurrentOrganization" class="flex column center middle g-1 vh100">
        Are you an Employer and want to manage attendance of employees of your organisetion?
        <button @click="CreateOrganization">Click here to Create an Organisetion</button>
    </div>
` }
        getData() {
            return {
                tab: "dashboard",
                CurrentDevice: false,
                CurrentUser: false,
                CurrentOrganization: false,
                CurrentEmployee: false,
                CurrentBranch: false,
                Today: new Date(),
                FormattedDate: "",
            } 
        }
        on__load() {
            if (window.WebolementApp.CurrentDevice) {
                this.data.CurrentDevice = JSON.parse(JSON.stringify(window.WebolementApp.CurrentDevice))
            }
            if (window.WebolementApp.CurrentUser) {
                this.data.CurrentUser = JSON.parse(JSON.stringify(window.WebolementApp.CurrentUser))
            }
            if (window.WebolementApp.CurrentOrganization) {
                this.data.CurrentOrganization = JSON.parse(JSON.stringify(window.WebolementApp.CurrentOrganization))
            }
            if (window.WebolementApp.CurrentEmployee) {
                this.data.CurrentEmployee = JSON.parse(JSON.stringify(window.WebolementApp.CurrentEmployee))
            }
            if (window.WebolementApp.CurrentBranch) {
                this.data.CurrentBranch = JSON.parse(JSON.stringify(window.WebolementApp.CurrentBranch))
            }
        }
    });


    window.addMyCustomeElement('launcher-div', class extends Webolement {
        getContent() { return `
    <div class="flex column center middle  vh100 vw100">
        <div class="animate__animated animate__pulse flex column center middle">
            <img src="/android-chrome-192x192.png" alt="">
            <h1>Webolement</h1>
        </div>
    </div>
` }
        
    });


    window.addMyCustomeElement('login-div', class extends Webolement {
        getContent() { return `
    <div style="padding-bottom: 3rem;">
        <nav class="flex middle p-1 g-1">
            <label if="mobile_not_present" class="flex-1">Signup</label>
            <label if="!mobile_not_present && !CurrentDevice.OtpCreatedOn" class="flex-1"> Login </label>
            <label if="CurrentDevice.OtpCreatedOn" class="flex-1"> Verify </label>
            <button if="CurrentDevice.Mobile" class="link" @click="changeMobile"> Change Mobile </button>
        </nav>
        <form if="CurrentDevice.OtpCreatedOn" class="flex column center"
            style="padding: 0.75rem 1.5rem; gap: 0.5rem; flex-shrink: 0; text-align: center;" @submit="onsubmit">
            <div class="flex column">
                <h2 style="margin-bottom: 0;">Enter verification code</h2>
                <p style="margin-top: 0;">Enter the 4-digit that we have sent via sms on the phone number <span
                        text="phonenumber"></span></p>
            </div>
            <div class="otp-input-holder">
                <div class="otp-flex">
                    <div class="input otp-box" :class="(otp.length == 0)?'active':''" tabindex="1" @blur="focusOtpinput"></div>
                    <div class="input otp-box" :class="(otp.length == 1)?'active':''" tabindex="1" @click="focusOtpinput"></div>
                    <div class="input otp-box" :class="(otp.length == 2)?'active':''" tabindex="1" @click="focusOtpinput"></div>
                    <div class="input otp-box" :class="(otp.length == 3)?'active':''" tabindex="1" @click="focusOtpinput"></div>
                    <div class="input otp-box" :class="(otp.length == 4)?'active':''" tabindex="1" @click="focusOtpinput"></div>
                    <div class="input otp-box" :class="(otp.length == 5)?'active':''" tabindex="1" @click="focusOtpinput"></div>
                </div>
                <input ref="otpinput" type="tel" maxlength="6" :value="otp" @input="setValue(event, 'otp')"  />
            </div>
            <button type="button" @click="resendOtp" class="link"> Resend OTP </button>
            <button class="primary" :disabled="otp.length < 6">Continue</button>
        </form>
        <form else style="padding: 0.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;"
            @submit="onsubmit">
            <div class="flex column">
                <h2 style="margin-bottom: 0;">Welcome.</h2>
                <p style="margin-top: 0;"><span if="!mobile_not_present">Log-in /</span> Sign-up to your account</p>
            </div>
            <div class="flex column g-1" style="margin-bottom: 2em;">
                <div class="flex column">
                    <label for="">Mobile</label>
                    <input placeholder="Mobile Number" type="number" :value="mobile"
                        @input="setValue(event, 'mobile')" />
                </div>
                <div if="mobile_not_present" class="flex column">
                    <label for="">Name</label>
                    <input placeholder="Enter your name" :value="name" @input="setValue(event, 'name')" />
                </div>
                <div if="mobile_not_present" class="flex column">
                    <label for="">Email</label>
                    <input placeholder="Enter your email" type="email" :value="email"
                        @input="setValue(event, 'email')" />
                </div>
                <div if="mobile_not_present" class="flex column">
                    <label for="">Are You A Employer</label>
                    <label class="switch">
                        <input type="checkbox" :checked="employer"
                            @input="setValue(event, 'employer')" value="1">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="flex g-1 eq">
                <button if="!mobile_not_present" class="primary">Login</button>
                <button class="primary"> Signup</button>
            </div>
        </form>
    </div>
` }
        getData() {
            return {
                CurrentDevice: false,
                submited: false,
                mobile_not_present: false,
                mobile: "",
                name: "",
                email: "",
                otp: "",
            }
        }
        on__load() {
            this.data.CurrentDevice = JSON.parse(JSON.stringify(window.WebolementApp.CurrentDevice))
            this.data.mobile = this.data.CurrentDevice.Mobile
            this.data.email = this.data.CurrentDevice.Email
        }
        changeMobile() {
            this.data.CurrentDevice.OtpCreatedOn = 0
            this.data.mobile_not_present = false
        }
        setValue(event, property) {
            this.data[property] = event.target.value
        }
        resendOtp(event) {
            var request_data = {
                otp: "Resend"
            }
            call_api("login", request_data).then(data => {
                if (data.CurrentDevice) {
                    this.data.CurrentDevice = data.CurrentDevice
                }
                if (data.Message.includes("User Not Found")) {
                    this.data.mobile_not_present = true
                }
            })
        }
        onsubmit(e) {
            e.preventDefault()
            e.stopPropagation()
            var request_data = {}
            if (this.data.CurrentDevice.OtpCreatedOn) {
                if (this.data.otp.trim().length != 6) {
                    window.show_error("Please enter valid otp")
                    return
                }
                request_data.otp = this.data.otp
            } else {
                if (!this.data.mobile.trim()) {
                    window.show_error("Please enter valid mobile number")
                    return
                }
                request_data.mobile = this.data.mobile
                if (this.data.mobile_not_present) {
                    if (!this.data.name.trim()) {
                        window.show_error("Please enter your name")
                        return
                    }
                    if (!this.data.email.trim()) {
                        window.show_error("Please enter your email")
                        return
                    }
                    request_data.name = this.data.name
                    request_data.email = this.data.email
                }
            }
            call_api("login", request_data).then(data => {
                if (data.Result.CurrentDevice) {
                    this.data.CurrentDevice = data.Result.CurrentDevice
                }
                if (data.Message.includes("User Not Found")) {
                    this.data.mobile_not_present = true
                }
            })
        }
        propertyChangedCallback(prop, old_value, new_value) {
            switch (prop) {
                case "CurrentDevice":
                    if(new_value.OtpCreatedOn > 0){
                        setTimeout(() => {
                            this.focusOtpinput()
                        }, 50);
                    }
                    break;
                default:
                    break;
            }
        }
        focusOtpinput(){
            this.refs.otpinput.focus()
        }
    });


    window.addMyCustomeElement('splash-screen', class extends Webolement {
        constructor() {
            super();
            this.refs.img.addEventListener('animationend', () => {
                if (this.link) {
                    window.webe_navigate(this.link)
                }
            });
        }
        getContent() {
            return (`
    <div style="height:100vh; width: 100vw; position: relative; background-color: black;">
        <div
            style="z-index: 1;position: fixed;top: 0;left: 0; height: 100vh;width: 100vw;display: flex;flex-direction: column; align-items: center;justify-content: center;">
            <div class="animate__animated animate__bounce">
                <svg ref="img" class="animate__animated animate__pulse" width="92" height="121" viewBox="0 0 92 121"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M81.5138 36.7096H10.5402C10.2476 36.7096 10.0225 36.4845 10.0225 36.1919V35.1789C10.0225 20.7276 21.7501 9 36.2014 9H55.8975C70.3489 9 82.0765 20.7276 82.0765 35.1789V36.1919C82.0315 36.4845 81.8064 36.7096 81.5138 36.7096Z"
                        fill="#0C87C9" />
                    <path
                        d="M54.3219 82.4258H10C10 97.7325 22.4029 110.135 37.7096 110.135H82.0315C82.0315 94.8287 69.6286 82.4258 54.3219 82.4258Z"
                        fill="#37C8FC" />
                    <path d="M41.8514 82.4436H10V35.0604C10 20.6992 21.6601 9.03906 36.0214 9.03906H41.8514V82.4436Z"
                        fill="#0C87C9" />
                </svg>
            </div>
            <div
                style="display: flex; align-items: center; justify-content: center; width: 100%;position: fixed;bottom: 100px;">
                <svg width="139" height="38" viewBox="0 0 139 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M23.4707 21.8291V21.7695C23.4707 17.1238 27.2707 13.2344 32.5162 13.2344C37.7617 13.2344 41.5058 17.0642 41.5058 21.7099V21.7695C41.5058 26.4152 37.7058 30.3046 32.4566 30.3046C27.2074 30.3046 23.4707 26.4748 23.4707 21.8291ZM35.925 21.8291V21.7695C35.925 19.7801 34.4795 18.0887 32.4566 18.0887C30.374 18.0887 29.0478 19.7465 29.0478 21.7099V21.7695C29.0478 23.7589 30.497 25.4465 32.5162 25.4465C34.6025 25.4465 35.9287 23.7887 35.9287 21.8291H35.925Z"
                        fill="white" />
                    <path
                        d="M42.895 21.8318V21.7722C42.895 16.4633 46.2144 13.2371 50.074 13.2371C52.5478 13.2371 53.9933 14.3547 55.0811 15.5878V7.89844H60.8109V29.9161H55.0811V27.7441C53.9635 29.1002 52.5478 30.2775 50.1038 30.2775C46.2442 30.2775 42.895 27.0512 42.895 21.8318ZM55.1891 21.7722V21.7126C55.1891 19.5704 53.6989 18.0318 51.8697 18.0318C50.0405 18.0318 48.5168 19.5406 48.5168 21.7126V21.7722C48.5168 23.9441 50.0256 25.4977 51.8697 25.4977C53.7138 25.4977 55.1705 23.9441 55.1705 21.7722H55.1891Z"
                        fill="white" />
                    <path
                        d="M62.8008 21.8291V21.7695C62.8008 17.0046 66.2096 13.2344 71.0341 13.2344C76.6745 13.2344 79.2674 17.3659 79.2674 22.1756C79.2674 22.5481 79.2674 22.9616 79.2376 23.3528H68.322C68.7727 25.1336 70.0692 26.0352 71.85 26.0352C73.2061 26.0352 74.2902 25.5248 75.4674 24.3773L78.6341 26.9852C77.0657 28.9783 74.8043 30.3046 71.5557 30.3046C66.422 30.3046 62.8008 26.8957 62.8008 21.8291ZM73.899 20.4134C73.6904 18.6028 72.6323 17.4554 71.0639 17.4554C69.5551 17.4554 68.5306 18.6326 68.2288 20.4134H73.899Z"
                        fill="white" />
                    <path
                        d="M87.0198 27.9416V29.9161H81.29V7.89844H87.0198V15.7704C88.1375 14.4143 89.5234 13.2371 91.9636 13.2371C95.8567 13.2371 99.2022 16.4633 99.2022 21.6828V21.7424C99.2022 27.0512 95.8492 30.2775 91.9971 30.2775C91.0428 30.3029 90.0958 30.105 89.2316 29.6994C88.3674 29.2938 87.61 28.6919 87.0198 27.9416ZM93.5655 21.7908V21.7312C93.5655 19.589 92.0753 18.0504 90.2126 18.0504C88.3498 18.0504 86.8932 19.589 86.8932 21.7312V21.7908C86.8932 23.9628 88.3834 25.5163 90.2126 25.5163C92.0418 25.5163 93.5655 23.9739 93.5655 21.7722V21.7908Z"
                        fill="white" />
                    <path
                        d="M100.588 21.8291V21.7695C100.588 17.0046 103.997 13.2344 108.821 13.2344C114.462 13.2344 117.055 17.3659 117.055 22.1756C117.055 22.5481 117.055 22.9616 117.025 23.3528H106.109C106.564 25.1336 107.86 26.0352 109.637 26.0352C110.997 26.0352 112.081 25.5248 113.258 24.3773L116.425 26.9852C114.857 28.9783 112.595 30.3046 109.347 30.3046C104.209 30.3046 100.588 26.8957 100.588 21.8291ZM111.686 20.4134C111.474 18.6028 110.419 17.4554 108.851 17.4554C107.342 17.4554 106.318 18.6326 106.016 20.4134H111.686Z"
                        fill="white" />
                    <path d="M119.216 7.89844H124.946V29.9161H119.216V7.89844Z" fill="white" />
                    <path d="M127.825 7.89844H133.555V29.9161H127.825V7.89844Z" fill="white" />
                    <path
                        d="M22.7252 14.4245H7.40968C7.39487 14.4251 7.3801 14.4225 7.3663 14.4171C7.35251 14.4117 7.33998 14.4034 7.3295 14.393C7.31901 14.3825 7.3108 14.37 7.30537 14.3562C7.29994 14.3424 7.2974 14.3276 7.29792 14.3128V14.0967C7.29792 12.5975 7.89323 11.1596 8.953 10.0991C10.0128 9.03865 11.4503 8.44239 12.9495 8.44141H17.1965C18.6958 8.44239 20.1333 9.03865 21.193 10.0991C22.2528 11.1596 22.8481 12.5975 22.8481 14.0967V14.3128C22.8445 14.3431 22.8301 14.3711 22.8075 14.3916C22.7849 14.4122 22.7557 14.4239 22.7252 14.4245Z"
                        fill="white" />
                    <path
                        d="M16.8578 24.3008H7.29444C7.29246 25.8847 7.919 27.4047 9.03654 28.5271C10.1541 29.6495 11.6713 30.2827 13.2552 30.2876H22.8372C22.8377 29.5019 22.6834 28.7238 22.3832 27.9977C22.0829 27.2716 21.6426 26.6118 21.0874 26.0558C20.5322 25.4999 19.8729 25.0588 19.1471 24.7576C18.4214 24.4565 17.6435 24.3013 16.8578 24.3008Z"
                        fill="white" />
                    <path
                        d="M14.1568 24.3049H7.29443V14.071C7.29395 13.3332 7.43877 12.6026 7.72066 11.9208C8.00254 11.239 8.41595 10.6194 8.93729 10.0973C9.45862 9.57531 10.0777 9.16108 10.7591 8.87829C11.4405 8.59551 12.171 8.44971 12.9087 8.44922H14.1568V24.3049Z"
                        fill="white" />
                </svg>
            </div>
        </div>
    </div>
`)
        }
        getData() {
            return {
                Message: "",
                Publishing: true,
                IntroDone: localStorage.getItem("IntroDone"),
                TCDone: localStorage.getItem("TCDone"),
                CatchList: [],
                CatchListIndex: 0,
                LastUpdatedOn: parseInt(localStorage.getItem("LastUpdatedOn")),
                ServiceWorkerVersion: "",
                CatchComplete: false,
            }
        }
        on__load() {
            this.moveon()
        }
        navigate_to(link) {
            this.link = link
            this.refs.img.classList.add("animate__zoomOut")
        }
        moveon() {
        }
    });


    window.addMyCustomeElement('test-page', class extends Webolement {
        getContent() { return `
    <div class="flex middle wrap g-1 p-1">
        <h2 class="animate__animated animate__pulse">Buttons</h2>
        <button class="">Text Button</button>
        <button class="secondary">Text Button</button>
        <button class="round">Text Button</button>
        <button class="outline">Text Button</button>
        <button class="link">Text Button</button>
        <button class="" disabled>Text Button</button>
        <button class="secondary" disabled>Text Button</button>
        <button class="round" disabled>Text Button</button>
        <button class="outline" disabled>Text Button</button>
        <button class="link" disabled>Text Button</button>
    </div>
    <div class="flex middle wrap g-1 p-1">
        <button class="big">Text Button</button>
        <button class="big primary">Text Button</button>
        <button class="big round">Text Button</button>
        <button class="big outline">Text Button</button>
        <button class="big link">Text Button</button>

        <button class="big fab">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab round">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
    <div class="flex middle wrap g-1 p-1">
        <button class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Text Button</span>
        </button>
        <button class="primary">
            <span>Text Button</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="round">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Text Button</span>
        </button>
        <button class="outline">
            <span>Text Button</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Text Button</span>
        </button>




        <button class="fab">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab round">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
    <div class="flex column middle g-1 p-1">
        <h2 class="animate__animated animate__bounce">Inputs</h2>
        <div class="overflow_x_auto w100">
            <div class="flex row top g-1" style="width: max-content;">
                <label>Input Label</label>
                <div class="input-group">
                    <input type="text" placeholder="placeholder text" value="65464" />
                    <span class="sub mute"> This is help text</span>
                </div>
                <button class="primary">Button Text</button>
            </div>
            <div class="flex row top g-1" style="width: max-content;">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" value="65464" />
                    <span class="sub mute"> This is help text</span>
                </div>
                <button class="small primary">Button Text</button>
            </div>
        </div>
        <style>
            .grid {
                display: flex;
                gap: 1rem;
                flex-direction: row;
                flex-wrap: wrap;
                max-width: 1000px;
            }

            .grid>* {
                min-width: 300px;
                max-width: 100%;
                flex: 1;
            }
        </style>
        <div class="grid">
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" />
                </div>
            </div>
            <div class="flex column">
                <div class="input-group">
                    <label>Input Label</label>
                    <input class="small" type="text" required readonly placeholder="placeholder text"
                        value="This is sample text of read only input" />
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" disabled />
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" value="65464" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" class="error" placeholder="placeholder text" value="65464" />
                    <span class="mute error"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group flex g-1">
                    <label class="input small">
                        <input type="checkbox" placeholder="placeholder text" name="checkbox" />
                        Input Label
                    </label>
                    <label class="input small">
                        <input type="checkbox" placeholder="placeholder text" name="checkbox" />
                        Input Label
                    </label>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input small flex g-1">
                    <label>
                        <input type="radio" placeholder="placeholder text" name="radio" />
                        Input Label
                    </label>
                    <label>
                        <input type="radio" placeholder="placeholder text" name="radio" />
                        Input Label
                    </label>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="color" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="date" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="datetime" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="datetime-local" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="email" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="file" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="image" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="month" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="number" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="password" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="win10-thumb" type="range" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="range" placeholder="placeholder text" min="0" max="1" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="search" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="tel" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="time" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="url" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="week" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <select class="small" placeholder="placeholder text">
                        <option>Default</option>
                        <option>Option 1</option>
                        <optgroup label="Option group">
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </optgroup>
                    </select>
                    <span class="mute"> This is help text</span>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2>Cards</h2>
        <div class="flex center row wrap m-1 p-1 g-1">
            <div class="sb-1 r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="b-1 r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="pb-1 r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="shadow r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="shadow-s r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="shadow-p r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="error_bg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="success_bg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="bg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="sbg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="pbg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
        </div>
    </div>
    <div class="flex wrap center m-1 p-1 g-1">
        <button @click="showModel">Show Model</button>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_bottom'" @input="set_model_side"
                    value="from_bottom">
                <span class="slider round"></span>
            </label>
            <span class="mute"> From Bottom</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_top'" @input="set_model_side"
                    value="from_top">
                <span class="slider round"></span>
            </label>
            <span class="mute"> From Top</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_left'" @input="set_model_side"
                    value="from_left">
                <span class="slider round"></span>
            </label>
            <span class="mute"> From Left</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_right'" @input="set_model_side"
                    value="from_right">
                <span class="slider round"></span>
            </label>
            <span class="mute">From Right</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="checkbox" :checked="fullscreen_model" @input="set_model_fullscreen">
                <span class="slider round"></span>
            </label>
            <span class="mute">Full screen</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="checkbox" :checked="fullwidth_model" @input="set_model_fullwidth">
                <span class="slider round"></span>
            </label>
            <span class="mute">Full width</span>
        </div>
    </div>
    <div class="flex center wrap g-1">
            <button class="big" :class="loadingBtn?'loading':''" @click="startLoadingBtn">Show Loading</button>
            <button :class="loadingBtn?'loading':''" @click="startLoadingBtn">Show Loading</button>
    </div>
    <loading-div :value="loading" :full_screen="loading_fullscreen">
        <div class="flex center m-1 p-1">
            <button class="big" @click="startLoading">Show Loading</button>
            <div class="input-group">
                <label class="switch">
                    <input type="checkbox" :checked="loading_fullscreen" @input="switchLoadingFullscreen">
                    <span class="slider round"></span>
                </label>
                <span class="mute"> Show loading fullscreen</span>
            </div>
        </div>
    </loading-div>
    <div class="flex center m-1 p-1">
        <color-scheme-btn></color-scheme-btn>
    </div>
    <modal-view :value="ShowingModel" @closed="model_closed"
        :model_class="model_side+(fullscreen_model?' full_screen':'')+(fullwidth_model?' full_width':'')">
        <div style="display: flex;justify-content: center;text-align: center;flex-direction: column;">
            <img src="/img/success.png" style="margin: auto;">
            <h2>Sample Modal</h2>
            <p style="width: 257px;">Sample Model View Content</p>
            <button class="btn" @click="showModel"> Got It! </button>
        </div>
    </modal-view>
` }
        getData() {
            return {
                ShowingModel: false,
                loading: false,
                loadingBtn : false,
                loading_fullscreen: false,
                model_side: "",
                fullscreen_model: false,
                fullwidth_model: false,
            }
        }
        startLoadingBtn(event){
            debugger
            this.data.loadingBtn = !this.data.loadingBtn
        }
        set_model_fullwidth(event) {
            this.data.fullwidth_model = event.target.checked
        }
        set_model_fullscreen(event) {
            this.data.fullscreen_model = event.target.checked
        }
        set_model_side(event) {
            if (event.target.checked) {
                this.data.model_side = event.target.value
            }
        }
        model_closed() {
            this.data.ShowingModel = false
        }
        showModel() {
            this.data.ShowingModel = !this.data.ShowingModel
        }
        startLoading() {
            this.data.loading = true
            setTimeout(() => {
                this.data.loading = false
            }, 5000);
        }
        switchLoadingFullscreen(event) {
            this.data.loading_fullscreen = event.target.checked
        }
    });


    window.addMyCustomeElement('user-div', class extends Webolement {
        getContent() { return `
    <nav class="flex row middle p-1">
        <a href="/account_settings" class="not_a_link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9.31461 12.7071C8.89513 12.3166 8.89513 11.6834 9.31461 11.2929L15 6"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
            </svg></a>
        <label style="font-size: 1.3rem; text-overflow: clip;">User Details</label>
        <span style="flex: 1;"></span>
    </nav>
    <form @submit="onsubmit" class="responsive-form flex column g-1 p-1" style="padding-bottom: 100px;">
        <image-input :image="User.Photo" @input="setValue(event, 'Photo')"></image-input>
        <div class="flex row wrap">
            <label>Name</label>
            <input :value="User.Name" @input="setValue(event, 'Name')" />
        </div>
        <div class="flex row wrap">
            <label>Mobile</label>
            <input type="tel" :value="User.Mobile" readonly />
        </div>
        <div class="flex row wrap">
            <label>Email</label>
            <input type="email" :value="User.Email" readonly />
        </div>
        <div class="flex row wrap">
            <label for="">Are You A Employer</label>
            <label class="switch">
                <input type="checkbox" :checked="User.Employer"
                    @input="setValue(event, 'Employer')" value="1">
                <span class="slider round"></span>
            </label>
        </div>
        <!-- <div class="flex row wrap">
                <label>PIN</label>
                <input type="password" maxlength="4" />
            </div> -->
        <button class="primary">Update</button>
        <button class="error" type="button" @click="toggle_signout_popup">Signout & Delete</button>
    </form>
    <modal-view :value="show_signout_popup" :closable="false">
        <div style="display: flex;justify-content: center;text-align: justify;flex-direction: column; align-items: center;">
            <h2 class="flex middle g-1">
                Signout & Delete
            </h2>
            <p style="width: 257px;">Do you want to signout User from this device</p>
            <label for="inputDelete" class="mute sub p-1" style="width: 257px;">
                <input type="checkbox" value="1" name="inputDelete" id="inputDelete" :checked="delete_user" style="display: inline; height: auto;" @input="toggle_delete"> Also mark to delete all data about this user 
            </label>
            <p if="delete_user" class="sub mute" style="width: 257px;">All personal details other then Name & Mobile Number will be deleted after 30 days.</p>
            <div class="flex g-1">
                <button class="error" @click="dosignout"> Signout </button>
                <button class="outline" @click="toggle_signout_popup"> Cancel </button>
            </div>
        </div>
    </modal-view>
` }
        getData() {
            return {
                User: false,
                delete_user : false,
                show_signout_popup : false,
            }
        }
        toggle_delete(event){
            this.data.delete_user = event.target.checked
        }
        on__load() {
            if (window.WebolementApp.CurrentUser) {
                this.data.User = JSON.parse(JSON.stringify(window.WebolementApp.CurrentUser))
            }
        }
        setValue(event, property) {
            event.preventDefault()
            event.stopPropagation()
            if(event.target.type == "checkbox"){
                this.data.User[property] = event.target.checked
            } else this.data.User[property] = event.target.value
        }
        onsubmit(e) {
            e.preventDefault()
            e.stopPropagation()
            if (!this.data.User.Name.trim()) {
                window.show_error("Please enter User name")
                return
            }
            var request_data = {
                record: this.data.User
            }
            call_api("me", request_data).then(data => {
                if (data.Result.User) {
                    this.data.User = data.Result.User
                }
            })
        }
        toggle_signout_popup() {
            this.data.show_signout_popup = !this.data.show_signout_popup
            this.data.delete_user = false
        }
        dosignout() {
            var request_data = {
                id: this.data.User.ID,
                delete_user : this.data.delete_user
            }
            call_api("signout", request_data).finally(() => {
                this.data.loading = false
                this.toggle_signout_popup()
            })
        }
    });


    window.addMyCustomeElement('verify-div', class extends Webolement {
        getContent() { return `
    <div style="padding-bottom: 3rem;">
        <nav class="top-bar">
            <a href="/login" class="not_a_link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9.31461 12.7071C8.89513 12.3166 8.89513 11.6834 9.31461 11.2929L15 6"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            </a>
            <a href="/login">Change Number</a>
        </nav>
        <form
            style="padding: 0.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0; text-align: center;"
            @submit="onsubmit">
            <div class="flex column">
                <h2 style="margin-bottom: 0;">Enter verification code</h2>
                <p style="margin-top: 0;">Enter the 6-digit that we have sent via sms on the phone number <span
                        text="phonenumber"></span></p>
            </div>
            <div class="otp-input-holder">
                <div class="otp-flex">
                    <div class="input otp-box" :class="(otp.length == 0)?'active':''"></div>
                    <div class="input otp-box" :class="(otp.length == 1)?'active':''"></div>
                    <div class="input otp-box" :class="(otp.length == 2)?'active':''"></div>
                    <div class="input otp-box" :class="(otp.length == 3)?'active':''"></div>
                    <div class="input otp-box" :class="(otp.length == 4)?'active':''"></div>
                    <div class="input otp-box" :class="(otp.length == 5)?'active':''"></div>
                </div>
                <input ref="input" type="tel" maxlength="6" :value="otp" @input="setValue(event, 'otp')" />
            </div>
            <p>
                <a href="#">Resend OTP</a>
            </p>
            <button class="primary" :disabled="otp.length < 6">Continue</button>
        </form>
    </div>
` }
        getData() {
            return {
                phonenumber: "9763429023",
                otp: "",
            }
        }
        on__load() {
            this.refs.input.focus()
        }
        setValue(event, property) {
            if (event.target.value != undefined) {
                this.data[property] = event.target.value
            }
        }
        onsubmit(e) {
            e.preventDefault()
            e.stopPropagation()
            window.webe_navigate("/add_organisation")
        }
    });
