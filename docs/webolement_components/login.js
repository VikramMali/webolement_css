
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
