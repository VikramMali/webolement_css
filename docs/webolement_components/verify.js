
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
