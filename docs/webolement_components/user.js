
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
