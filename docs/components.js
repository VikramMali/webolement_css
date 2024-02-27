

    window.addMyCustomeElement('color-scheme-btn', class extends Webolement {
        getContent() { return `
    <button class="link" @click="submit">
        <svg if="current_scheme == 'system'" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.9454 6.83491L16.3204 7.48443V7.48443L15.9454 6.83491ZM18.6774 7.56696L19.3269 7.19196V7.19196L18.6774 7.56696ZM19.1774 8.43299L18.5279 8.80799L19.1774 8.43299ZM18.4454 11.165L18.8204 11.8146L18.4454 11.165ZM18.4454 12.8349L18.0704 13.4844L18.4454 12.8349ZM19.1774 15.567L19.827 15.942L19.1774 15.567ZM18.6774 16.433L18.0279 16.058L18.6774 16.433ZM15.9454 17.165L16.3204 16.5155L15.9454 17.165ZM8.05307 17.165L7.67807 16.5155H7.67807L8.05307 17.165ZM5.32102 16.433L5.97054 16.058H5.97054L5.32102 16.433ZM4.82102 15.567L4.1715 15.942H4.1715L4.82102 15.567ZM5.55307 12.8349L5.17807 12.1854H5.17807L5.55307 12.8349ZM5.55309 11.165L5.17809 11.8146H5.17809L5.55309 11.165ZM4.82104 8.43299L4.17152 8.05799H4.17152L4.82104 8.43299ZM5.32104 7.56696L5.97056 7.94196L5.32104 7.56696ZM8.05309 6.83491L7.67809 7.48443L8.05309 6.83491ZM11.4991 3.25C9.98036 3.25 8.74914 4.48122 8.74914 6H10.2491C10.2491 5.30964 10.8088 4.75 11.4991 4.75V3.25ZM12.4991 3.25H11.4991V4.75H12.4991V3.25ZM15.2491 6C15.2491 4.48122 14.0179 3.25 12.4991 3.25V4.75C13.1895 4.75 13.7491 5.30964 13.7491 6H15.2491ZM19.3269 7.19196C18.5676 5.87666 16.8857 5.426 15.5704 6.18539L16.3204 7.48443C16.9182 7.13925 17.6827 7.3441 18.0279 7.94196L19.3269 7.19196ZM19.8269 8.05799L19.3269 7.19196L18.0279 7.94196L18.5279 8.80799L19.8269 8.05799ZM18.8204 11.8146C20.1357 11.0552 20.5863 9.37329 19.8269 8.05799L18.5279 8.80799C18.8731 9.40585 18.6682 10.1703 18.0704 10.5155L18.8204 11.8146ZM19.827 15.942C20.5864 14.6267 20.1357 12.9448 18.8204 12.1854L18.0704 13.4844C18.6683 13.8296 18.8731 14.5941 18.5279 15.192L19.827 15.942ZM19.327 16.808L19.827 15.942L18.5279 15.192L18.0279 16.058L19.327 16.808ZM15.5704 17.8146C16.8857 18.5739 18.5676 18.1233 19.327 16.808L18.0279 16.058C17.6828 16.6559 16.9183 16.8607 16.3204 16.5155L15.5704 17.8146ZM12.4991 20.75C14.0179 20.75 15.2491 19.5188 15.2491 18H13.7491C13.7491 18.6904 13.1895 19.25 12.4991 19.25V20.75ZM11.4991 20.75H12.4991V19.25H11.4991V20.75ZM8.74914 18C8.74914 19.5188 9.98036 20.75 11.4991 20.75V19.25C10.8088 19.25 10.2491 18.6904 10.2491 18H8.74914ZM4.6715 16.808C5.43089 18.1233 7.11276 18.574 8.42807 17.8146L7.67807 16.5155C7.0802 16.8607 6.31571 16.6559 5.97054 16.058L4.6715 16.808ZM4.1715 15.942L4.6715 16.808L5.97054 16.058L5.47054 15.192L4.1715 15.942ZM5.17807 12.1854C3.86276 12.9448 3.41211 14.6267 4.1715 15.942L5.47054 15.192C5.12536 14.5941 5.3302 13.8296 5.92807 13.4844L5.17807 12.1854ZM4.17152 8.05799C3.41213 9.37329 3.86279 11.0552 5.17809 11.8146L5.92809 10.5155C5.33023 10.1703 5.12538 9.40585 5.47056 8.80799L4.17152 8.05799ZM4.67152 7.19196L4.17152 8.05799L5.47056 8.80799L5.97056 7.94196L4.67152 7.19196ZM8.42809 6.18539C7.11279 5.426 5.43091 5.87666 4.67152 7.19196L5.97056 7.94196C6.31574 7.3441 7.08023 7.13925 7.67809 7.48443L8.42809 6.18539ZM7.67809 7.48443C8.82082 8.14419 10.2491 7.31942 10.2491 6H8.74914C8.74914 6.16481 8.57074 6.26775 8.42809 6.18539L7.67809 7.48443ZM5.92807 13.4844C7.07077 12.8247 7.07085 11.1753 5.92809 10.5155L5.17809 11.8146C5.32079 11.8969 5.32083 12.103 5.17807 12.1854L5.92807 13.4844ZM10.2491 18C10.2491 16.6806 8.82085 15.8557 7.67807 16.5155L8.42807 17.8146C8.57069 17.7322 8.74914 17.8351 8.74914 18H10.2491ZM16.3204 16.5155C15.1777 15.8558 13.7491 16.6804 13.7491 18H15.2491C15.2491 17.8352 15.4276 17.7321 15.5704 17.8146L16.3204 16.5155ZM18.0704 10.5155C16.9276 11.1753 16.9277 12.8247 18.0704 13.4844L18.8204 12.1854C18.6776 12.103 18.6777 11.8969 18.8204 11.8146L18.0704 10.5155ZM13.7491 6C13.7491 7.31962 15.1777 8.14415 16.3204 7.48443L15.5704 6.18539C15.4275 6.26785 15.2491 6.16473 15.2491 6H13.7491ZM13.431 11.9999C13.431 12.7907 12.79 13.4318 11.9992 13.4318V14.9318C13.6184 14.9318 14.931 13.6191 14.931 11.9999H13.431ZM11.9992 13.4318C11.2084 13.4318 10.5674 12.7907 10.5674 11.9999H9.06738C9.06738 13.6191 10.38 14.9318 11.9992 14.9318V13.4318ZM10.5674 11.9999C10.5674 11.2092 11.2084 10.5681 11.9992 10.5681V9.06812C10.38 9.06812 9.06738 10.3807 9.06738 11.9999H10.5674ZM11.9992 10.5681C12.79 10.5681 13.431 11.2092 13.431 11.9999H14.931C14.931 10.3807 13.6184 9.06812 11.9992 9.06812V10.5681Z"
                fill="currentColor"></path>
        </svg>
        <svg if="current_scheme == 'light'" title="light" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
            <path
                d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z">
            </path>
        </svg>
        <svg if="current_scheme == 'dark'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="bi bi-moon-stars" viewBox="0 0 16 16">
            <path
                d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z">
            </path>
            <path
                d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z">
            </path>
        </svg>
        <span :text="current_scheme" style="text-transform: capitalize;" ></span>
    </button>
` }
        getData() {
            return {
                current_scheme: "dark"
            }
        }
        on__load() {
            var theme_name = localStorage.getItem("theme_name")
            if (!theme_name) {
                theme_name = "system"
            }
            this.data.current_scheme = theme_name
        }
        submit(e) {
            if (e) {
                e.preventDefault()
                e.stopPropagation()
            }
            var theme_name = localStorage.getItem("theme_name")
            switch (this.data.current_scheme) {
                case 'light':
                    this.data.current_scheme = 'dark'
                    setTheme('dark')
                    break;
                case 'dark':
                    this.data.current_scheme = 'system'
                    setTheme('system')
                    break;
                case 'system':
                    this.data.current_scheme = 'light'
                    setTheme('light')
                    break;
                default:
                    this.data.current_scheme = 'dark'
                    setTheme('dark')
                    break;
            }
        }
    });


    window.addMyCustomeElement('dropdown-view', class extends Webolement {
        getContent() { return `
    <div class="dropdown-holder">
        <button :text="label"></button>
        <div>
            <slot>
                <div for-loop="items.length">
                        <label for="" :text="items[index]"></label>
                </div>
            </slot>
        </div>
    </div>
` }
        static get observedAttributes() { return ["label"]; }
        constructor() {
            super();
        }
        getClass(isopen, model_class) {
            var class_to_return = ""
            if (isopen) {
                if (model_class.includes("from_bottom")) {
                    class_to_return = "animate__animated animate__slideInUp"
                }
                if (model_class.includes("from_top")) {
                    class_to_return = "animate__animated animate__slideInDown"
                }
                if (model_class.includes("from_left")) {
                    class_to_return = "animate__animated animate__slideInLeft"
                }
                if (model_class.includes("from_right")) {
                    class_to_return = "animate__animated animate__slideInRight"
                }
            } else {
                class_to_return = ""
            }
            return class_to_return + " " + model_class
        }
        close_modal(event, override) {
            if (this.data.closable || override) {
                this.data.isopen = false
                var event = new Event('closed', {
                    data: false,
                    bubbles: true,
                    cancelable: true,
                });
                this.dispatchEvent(event);
            }
        }
        open_modal(event) {
            this.data.isopen = true
            var event = new Event('opened', {
                data: true,
                bubbles: true,
                cancelable: true,
            });
            this.dispatchEvent(event);
        }
        getData() {
            return {
                error: false,
                success: false,
                closable: true,
                isopen: false,
                model_class: "",
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "value":
                    if (newValue) {
                        this.open_modal()
                    } else {
                        this.close_modal(null, true)
                    }
                    break;
                case "closable":
                    this.data.closable = !!newValue
                    break;
                case "model_class":
                    this.data.model_class = newValue
                    break;
                default:
                    break;
            }
        }
    });


    window.addMyCustomeElement('image-input', class extends Webolement {
        static get observedAttributes() { return ["image", "max", "radius", "asitis"]; }
        constructor() {
            super();
            loadstyle("croppercss", "/cropperjs/1.5.13/cropper.min.css", this.refs.image_editor)
            loadjs("cropperjs", "/cropperjs/1.5.13/cropper.min.js", this.refs.image_editor)
            loadjs("heic2any", "/js/heic2any.min.js", this.refs.image_editor)
        }
        getContent() { return `
    <loading-view :value="loading">
        <div ref="blog_photo_img_holder" class="flex column center input"
            style="position: relative;margin: auto;overflow: hidden;width: calc(100% - 2em);padding: 1em; max-width: 250px;">
            <img ref="blog_photo_img" :src="value?value:'/img/empty.jpg'"
                :style="'width: 100%; height: auto; border-radius: 14px;'" />
            <a href="#" class="btn sm" type="button" @click="load_image"
                style="color: #FFF;position: absolute;bottom: 4px;right: 4px;background: #00000094;border: navajowhite;border-radius: 14px;padding: 10px;">
                <svg style="height: 1.15em; width: 1.15em;" viewBox="0 0 13 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.33333 11.6666H2.26667L8.01667 5.91658L7.08333 4.98325L1.33333 10.7333V11.6666ZM10.8667 4.94992L8.03333 2.14992L8.96667 1.21659C9.22222 0.96103 9.53622 0.833252 9.90867 0.833252C10.2807 0.833252 10.5944 0.96103 10.85 1.21659L11.7833 2.14992C12.0389 2.40547 12.1722 2.71392 12.1833 3.07525C12.1944 3.43614 12.0722 3.74436 11.8167 3.99992L10.8667 4.94992ZM9.9 5.93325L2.83333 12.9999H0V10.1666L7.06667 3.09992L9.9 5.93325Z"
                        fill="currentColor" />
                </svg>
            </a>
        </div>
    </loading-view>
    <modal-view :value="editing" closable="true" @closed="closed" :full_screen="true">
        <div ref="image_editor">
            <img ref="image_to_edit" alt="" style="max-width: 100%; max-height: 70vh;">
            <div class="flex g-1 eq p-1">
                <button class="primary small" @click="acceptImage"> Accept </button>
                <button class="outlined small" @click="closed">Cancel</button>
            </div>
        </div>
    </modal-view>
` }
        load_image(event) {
            event.preventDefault()
            event.stopPropagation()
            var component = this
            // <input accept="image/*" type='file' class="btn" @change="load_image"> Change</button>
            if (!this.file_input) {
                this.file_input = document.createElement('input');
                this.file_input.type = 'file';
                this.file_input.onchange = (event) => {
                    // you can use this method to get file and perform respective operations
                    //let files = Array.from(this.file_input.files);
                    console.log("File uploded");
                    console.log(event.target.files.length);
                    if (event.target.files.length) {
                        console.log(event.target.files[0]);
                        console.log(event.target.files[0].name);
                        if (event.target.files[0].name.includes(".heic")) {
                            component.toPngFile(event.target.files[0])
                        } else if (this.data.asitis) {
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.addEventListener("load", () => {
                                // convert image file to base64 string
                                component.toDataURL(reader.result);
                            }, false);
                            if (file) {
                                reader.readAsDataURL(file);
                            }
                        } else {
                            component.toDataURL(URL.createObjectURL(event.target.files[0]))
                        }
                    }
                };
            }
            this.file_input.click();
        }
        toPngFile(src, callback) {
            var filename = src.name.replaceAll(".heic", ".png")
            this.data.loading = true
            heic2any({
                blob: src,
                toType: "image/png",
            }).then((resultBlob) => {
                this.saveFile(resultBlob, filename);
            }).catch((x) => {
                console.log(x)
                window.show_error("Faile to decode image file please upload jpg, jpeg, png type of file orsmaller heic file")
            }).finally(() => {
                this.data.loading = false;
            });
        }
        saveFile(blob, filename) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                var base64data = reader.result;
                this.toDataURL(base64data)
            }
        }
        closed(event) {
            this.data.editing = false
            if (this.cropper) {
                this.cropper.destroy()
            }
        }
        acceptImage(e) {
            const croppedCanvas = this.cropper.getCroppedCanvas({
                width: 300, // Set default crop width
                height: 300 // Set default crop height
            });
            const croppedImage = croppedCanvas.toDataURL();
            this.value = croppedImage
            var event = new InputEvent('input', {
                data: this.value,
                bubbles: false,
                cancelable: true,
            });
            this.dispatchEvent(event);
            this.closed(e)
        }
        toDataURL(src) {
            this.data.editing = true
            this.refs.image_to_edit.src = src
            if (this.cropper) {
                this.cropper.destroy()
            }
            this.cropper = new Cropper(this.refs.image_to_edit, {
                aspectRatio: 1,
                crop(event) {
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                    console.log(event.detail.rotate);
                    console.log(event.detail.scaleX);
                    console.log(event.detail.scaleY);
                },
            });
        }
        getData() {
            return {
                editing: false,
                loading: false,
                submited: false,
                max: 400,
                asitis: false,
                radius: "17px",
                value: "",
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "image":
                    this.data.value = newValue
                    break;
                case "max":
                    this.data.max = parseInt(newValue)
                    break;
                case "radius":
                    this.refs.blog_photo_img_holder.style.borderRadius = newValue
                    this.refs.blog_photo_img.style.borderRadius = newValue
                    break;
                case "asitis":
                    this.data.asitis = true
                default:
                    break;
            }
        }
    });


    window.addMyCustomeElement('list-loader-div', class extends Webolement {
        getContent() { return `
    <div class="flex row wrap between" style="align-items: center;">
        <label>
            Page Size :
            <select :value="perPage" @input="setPerPage"
                style="width: 4em;padding: 0;text-align: end;">
                <option :selected="perPage == 5" value="5">5</option>
                <option :selected="perPage == 7" value="7">7</option>
                <option :selected="perPage == 8" value="8">8</option>
                <option :selected="perPage == 10" value="10">10</option>
                <option :selected="perPage == 20" value="20">20</option>
                <option :selected="perPage == 50" value="50">50</option>
                <option :selected="perPage == 100" value="100">100</option>
                <option :selected="perPage == 200" value="200">200</option>
                <option :selected="perPage == 500" value="500">500</option>
                <option :selected="perPage == 1000" value="1000">1000</option>
            </select>
        </label>

        <label if="loading" class="error">Loading...</label>
        <label if="!loading">
            Showing <span bind :text="pageTotal"></span>
            out of <span bind :text="Filtered.toString()"></span>
            <span if="Total > Filtered">(total <span bind :text="Total.toString()"></span>)</span>
        </label>
        <pagination-div if="Total > perPage" @input="on_page_change" :value="currentPage" :max="Filtered/perPage" />
    </div>
` }
        static get observedAttributes() { return ["api", "sort_by", "per_page", "desc", "filter", "fix_filter", "search"]; }
        pages = {}
        sort_by = "id"
        desc = true
        filter = false
        fix_filter = false
        search = false
        constructor() {
            super();
        }
        getData() {
            return {
                loading: false,
                perPage: 10,
                currentPage: 1,
                pageTotal: 0,
                Total: 0,
                Filtered: 0,
            }
        }
        reload() {
            if (this.pages[this.data.currentPage]) {
                delete this.pages[this.data.currentPage]
            }
            this.change_page(this.data.currentPage)
        }
        reset() {
            if (this.loading_done_once) {
                this.pages = {}
                this.data.Total = 0
                this.data.Filtered = 0
                this.change_page(1)
            }
        }
        on_page_change(event) {
            if (this.loading_done_once) {
                var page_no = parseInt(event.data)
                if (page_no) {
                    this.change_page(page_no)
                }
            }
        }
        change_page(page_no) {
            this.data.currentPage = page_no
            if (!this.pages[this.data.currentPage]) {
                this.setList([])
                this.loadData({
                    page: this.data.currentPage
                })
            } else {
                this.setList(this.pages[this.data.currentPage])
            }
        }
        setList(data) {
            this.currentData = data
            this.data.pageTotal = data.length
            var event = new InputEvent('input', {
                data: this.data.currentPage,
                bubbles: true,
                cancelable: true,
            });
            this.dispatchEvent(event);
        }
        loadData = debounce((request_data) => {
            if (!request_data || !request_data.page || !this.api) {
                alert("wrong request")
                return
            }
            if (this.sort_by) {
                request_data.sort = this.sort_by
                request_data.sortdesc = this.desc
            }
            if (this.fix_filter) request_data.fix_filter = this.fix_filter
            if (this.filter) request_data.filter = this.filter
            if (this.search) request_data.search = this.search
            request_data.limit = this.data.perPage
            if (this.data.conditions) {
                request_data.fix_condition = this.data.conditions
            }
            this.data.loading = true;
            window.call_api(this.api, request_data).then((data) => {
                if (Array.isArray(data.data)) {
                    this.pages[request_data.page] = data.data
                    this.data.Total = data.recordsTotal
                    this.data.Filtered = data.recordsFiltered
                    if (request_data.page == this.data.currentPage) {
                        this.setList(this.pages[request_data.page])
                    }
                }
                return data
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.data.loading = false;
            });
        }, 300)
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "api":
                    this.api = newValue
                    this.reset()
                    break;
                case "sort_by":
                    this.sort_by = newValue
                    this.reset()
                    break;
                case "search":
                    this.search = newValue
                    this.reset()
                    break;
                case "per_page":
                    this.data.perPage = newValue
                    break;
                case "desc":
                    var desc = eval(newValue)
                    if (desc) {
                        this.desc = true
                    } else {
                        this.desc = false
                    }
                    this.reset()
                    break;
                default:
                    break;
            }
        }
        propertyChangedCallback(prop, old_value, new_value) {
            switch (prop) {
                case "loading":
                    if (!new_value && old_value) {
                        this.loading_done_once = true
                    }
                    break;
                case "perPage":
                    this.reset()
                    break;
                default:
                    break;
            }
        }
        setPerPage(event) {
            this.data.perPage = parseInt(event.target.value)
        }
    });


    window.addMyCustomeElement('loading-div', class extends Webolement {
        static get observedAttributes() { return ["value", "full_screen"]; }
        getContent() { return `

    <!-- The Loader -->
    <div :class="full_screen?'full_screen':'loading-overlay-holder'">
        <style>
            .loading-overlay-holder {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .loading-overlay {
                display: none;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                backdrop-filter: blur(3px);
                z-index: 2;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .loading-overlay-holder .loading-overlay {
                position: absolute;
            }

            .full_screen .loading-overlay {
                position: fixed;
            }

            .loading_animation {
                border-radius: 50%;
                border: 0.3em solid var(--primary-base);
                border-left-color: transparent;
                max-width: 120px;
                max-height: 120px;
                height: 50px;
                width: 50px;
                -webkit-animation: spin 2s linear infinite;
                animation: spin 2s linear infinite;
            }
        </style>
        <div if="loading" class="loading-overlay">
            <!-- Modal content -->
            <div class="loading_animation"></div>
        </div>
        <slot>
            <p>Some Content...</p>
        </slot>
    </div>
` }
        getData() {
            return {
                loading: false,
                full_screen: false,
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "value":
                    newValue = eval(newValue)
                    if (newValue) {
                        this.data.loading = true
                    } else {
                        this.data.loading = false
                    }
                    break;
                case "full_screen":
                    if (newValue == "full_screen") {
                        this.data.full_screen = true
                    } else {
                        this.data.full_screen = false
                    }
                default:
                    break;
            }
        }
    });


    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    window.addMyCustomeElement('map-div', class extends Webolement {
        getContent() { return `
    <style>
        .gm-style .gm-style-iw-c {
            color: #000 !important;
        }
    </style>
    <div class="flex column g-1" style="height: 100%;">
        <p if="LocationError" :text="LocationError"></p>
        <div ref="map" id="branch_map" style="height: 100%; width: auto;">
        </div>
    </div>
` }
        getData() {
            return {
                loading: false,
                latitude: "",
                longitude: "",
                marker_lable: "Marked Location",
                LocationError: "",
                location_map: [],
            }
        }
        on__load() {
            this.initMap();
        }
        on__unload() {
            delete this.map
        }
        async initMap() {
            debugger
            this.data.loading = true
            debugger
            if (this.data.latitude && this.data.longitude) {
                var lat = parseFloat(this.data.latitude)
                var lng = parseFloat(this.data.longitude)
                this.getMap(lat, lng)
                this.addMarker(lat, lng, marker_lable, true)
            } else {
                this.getMap()
            }

            if (this.data.location_map.length) {
                this.setLocationMap()
            }

            this.data.loading = false
        }
        getMap(lat, lng) {
            if (this.Map) {
                return
            }
            var position
            if (lat && lng) {
                position = { lat: lat, lng: lng };
            } else {
                position = { lat: 18.5247614, lng: 73.7805666 }
            }
            this.Map = new Map(this.refs.map, {
                center: position,
                zoom: 8,
                mapId: "1ab069fb0edac50d"
            });
            return
        }
        tryGeolocation() {
            this.data.LocationError = "Capturing Location"
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        debugger
                        this.data.LocationError = ""
                        this.data.latitude = position.coords.latitude.toString()
                        this.data.longitude = position.coords.longitude.toString()
                        this.make_onlocation_event()
                        //this.getaddress()
                    },
                    (err) => {
                        this.data.LocationError = "Could not current location of device, Please check location is on and permission allowed and location service is on and try aganin. More details: (" + err.message + ")";
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 2500,
                    }
                );
            } else {
                this.data.LocationError = "Failed to Capture Location, Location feature is not available."
            }
        }
        getaddress() {
            this.data.LocationError = "Location recived, searching address"
            var request_data = {
                Latitude: this.data.latitude,
                Longitude: this.data.longitude
            }
            call_api("revgeocode", request_data).then(data => {
                if (data.Result.Address) {
                    this.data.AddressResponce = data.Result.Address
                    var result = JSON.parse(data.Result.Address)
                    if (result.items.length) {
                        this.data.Address = result.items[0].title
                        if (result.items[0].address) {
                            this.data.PinCode = result.items[0].address.postalCode
                            this.data.City = result.items[0].address.city
                            this.data.State = result.items[0].address.state
                            this.data.StateCode = result.items[0].address.stateCode
                            this.data.Country = result.items[0].address.countryName
                            this.data.CountryCode = result.items[0].address.countryCode
                        }
                    }
                }
            }).finally(() => {
                this.data.LocationError = ""
            })
        }
        make_onlocation_event() {
            var event = new InputEvent('onlocation', {
                bubbles: false,
                cancelable: true,
            });
            this.dispatchEvent(event);
        }
        make_onaddress_event() {
            var event = new InputEvent('onaddress', {
                bubbles: false,
                cancelable: true,
            });
            this.dispatchEvent(event);
        }
        swt_location = debounce((request_data) => {
            if (this.data.loading) {
                return
            }
            var lat = parseFloat(this.data.latitude)
            var lng = parseFloat(this.data.longitude)
            if (!lat || !lng) {
                return
            }
            if (this.Map) {
                debugger
                this.Map.setCenter({ lat: lat, lng: lng })
            }
            if (this.Marker) {
                debugger
                this.Marker.position = { lat: lat, lng: lng }
            }
        }, 30)
        propertyChangedCallback(prop, old_value, new_value) {
            switch (prop) {
                case "latitude":
                case "longitude":
                    if (new_value && this.Map) {
                        this.swt_location()
                    }
                    break;
                case "location_map":
                    if(this.Map){
                        this.setLocationMap()
                    }
                default:
                    break;
            }
        }
        setLocationMap() {
            this.data.location_map.forEach((punchLog, index) => {
                debugger
                var flightPlanCoordinates = [];

                var PunchInLat = parseFloat(punchLog.PunchInLat)
                var PunchInLon = parseFloat(punchLog.PunchInLon)

                this.getMap(PunchInLat, PunchInLon)

                var position = { lat: parseFloat(PunchInLat), lng: parseFloat(PunchInLon) };
                this.Map.setCenter(new google.maps.LatLng(PunchInLat, PunchInLon));
                this.addMarker(PunchInLat, PunchInLon, "Punch IN @" + getTime(punchLog.PunchInAt), false)
                flightPlanCoordinates.push({ lat: PunchInLat, lng: PunchInLon })

                if(punchLog.LocationLogs){
                    punchLog.LocationLogs.forEach(locationLog => {
                        var PunchInLat = parseFloat(locationLog.Latitude)
                        var PunchInLon = parseFloat(locationLog.Longitude)
                        var position = { lat: parseFloat(PunchInLat), lng: parseFloat(PunchInLon) };
                        this.Map.setCenter(new google.maps.LatLng(PunchInLat, PunchInLon));
                        this.addMarker(PunchInLat, PunchInLon, "@" + getTime(locationLog.LocationAt), false)
                        flightPlanCoordinates.push({ lat: PunchInLat, lng: PunchInLon })
                    });
                }

                if(punchLog.PunchOutAt){

                    var PunchOutLat = parseFloat(punchLog.PunchOutLat)
                    var PunchOutLon = parseFloat(punchLog.PunchOutLon)

                    var position = { lat: parseFloat(PunchOutLat), lng: parseFloat(PunchOutLon) };
                    this.addMarker(PunchOutLat, PunchOutLon, "Punch Out @" + getTime(punchLog.PunchOutAt), false)
                    flightPlanCoordinates.push({ lat: PunchOutLat, lng: PunchOutLon })
                }

                const flightPath = new google.maps.Polyline({
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
                flightPath.setMap(this.Map);
            });
        }
        addMarker(lat, lng, title, dragable) {
            if (!lat || !lng) {
                return
            }
            if (dragable) {
                dragable = true
            } else {
                dragable = false
            }
            var position = { lat: lat, lng: lng };
            var Marker
            if (dragable) {
                Marker = new AdvancedMarkerElement({
                    map: this.Map,
                    position: position,
                    gmpDraggable: dragable,
                    title: title,
                });
                Marker.addListener("dragend", (event) => {
                    setTimeout(() => {
                        this.data.latitude = this.Marker.position.lat
                        this.data.longitude = this.Marker.position.lng
                        this.make_onlocation_event()
                    }, { passive: false });
                });
                this.Marker = Marker
            } else {
                Marker = new AdvancedMarkerElement({
                    map: this.Map,
                    position: position,
                    title: title,
                });
            }
            this.infoWindow = new InfoWindow();
            this.infoWindow.close();
            this.infoWindow.setContent(
                title,
            );
            this.infoWindow.open(Marker.map, Marker);

        }
    })


    window.addMyCustomeElement('modal-view', class extends Webolement {
        getContent() { return `
    <style>
        /* Modal */
        .modal-holder {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 11;
            transition: bottom 0.5s;
        }

        .modal-bg {
            position: fixed;
            background-color: #88888888;
            backdrop-filter: blur(2px);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }

        .modal-content {
            margin: auto;
            padding: 1em;
            position: relative;
            background: var(--bg-color);
            border-radius: 0.5em;
            max-width: 100%;
            max-height: 100%;
            overflow: auto;
            z-index: 1;
            width: fit-content;
            --animate-duration: 0.5s;
        }

        .modal-holder.closed .modal-bg {
            display: none;
        }

        .modal-holder.open .modal-bg {
            display: flex;
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s
        }

        .modal-holder.closed {
            bottom: -100vh;
        }

        .modal-holder.open {
            bottom: 0;
        }

        .modal-content.animated {
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 1s;
            animation-name: animatetop;
            animation-duration: 1s
        }

        .modal-content.from_bottom {
            margin-bottom: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .modal-content.from_top {
            margin-top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        .modal-content.from_left {
            margin-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .modal-content.from_right {
            margin-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        .modal-content.full_screen {
            height: calc(100% - 2em);
            width: calc(100% - 2em);
            border-radius: 0;
        }

        .modal-content>.modal-close {
            align-self: end;
        }

        .modal-content.from_bottom.full_width,
        .modal-content.from_top.full_width {
            width: 100%;
        }

        .modal-content.from_left.full_width,
        .modal-content.from_right.full_width {
            height: 100%;
        }

        /* Modal */

        /* Add Animation */
        @-webkit-keyframes animatetop {
            from {
                opacity: 0
            }

            to {
                opacity: 1
            }
        }

        @keyframes animatetop {
            from {
                opacity: 0
            }

            to {
                opacity: 1
            }
        }



        /* Add Animation */
        @-webkit-keyframes animatebottom {
            from {
                bottom: -300px;
                opacity: 0
            }

            to {
                bottom: 0;
                opacity: 1
            }
        }

        @keyframes animatebottom {
            from {
                bottom: -300px;
                opacity: 0
            }

            to {
                bottom: 0;
                opacity: 1
            }
        }

        .delete,
        .modal-close {
            position: relative;
            padding: 0;
            width: 2rem;
            height: 2rem;
            background: none !important;
            border: none;
        }

        .modal-close::after {
            height: 50%;
            width: 2px;
        }

        .modal-close::before {
            height: 2px;
            width: 50%;
        }

        .modal-close::after,
        .modal-close::before {
            background-color: var(--text-color);
            content: "";
            display: block;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(-50%) rotate(45deg);
            transform-origin: center center;
        }

        /* Modal */
    </style>
    <div if="isopen" ref="modal_holder" class="modal-holder">
        <div class="modal-bg" @click="close_modal" tabindex="1"></div>
        <div class="modal-content shadow-s" :class="getClass(isopen, model_class)">
            <div class="flex">
                <span style="flex: 1;"></span>
                <button if="closable" type="button" class="modal-close" @click="close_modal"></button>
            </div>
            <slot>
                <p>Sample text in the Modal..</p>
            </slot>
        </div>
    </div>
` }
        static get observedAttributes() { return ["value", "closable", "model_class"]; }
        constructor() {
            super();
        }
        getClass(isopen, model_class) {
            var class_to_return = ""
            if (isopen) {
                if (model_class.includes("from_bottom")) {
                    class_to_return = "animate__animated animate__slideInUp"
                }
                if (model_class.includes("from_top")) {
                    class_to_return = "animate__animated animate__slideInDown"
                }
                if (model_class.includes("from_left")) {
                    class_to_return = "animate__animated animate__slideInLeft"
                }
                if (model_class.includes("from_right")) {
                    class_to_return = "animate__animated animate__slideInRight"
                }
            } else {
                class_to_return = ""
            }
            return class_to_return + " " + model_class
        }
        close_modal(event, override) {
            if (this.data.closable || override) {
                this.data.isopen = false
                var event = new Event('closed', {
                    data: false,
                    bubbles: true,
                    cancelable: true,
                });
                this.dispatchEvent(event);
            }
        }
        open_modal(event) {
            this.data.isopen = true
            var event = new Event('opened', {
                data: true,
                bubbles: true,
                cancelable: true,
            });
            this.dispatchEvent(event);
        }
        getData() {
            return {
                error: false,
                success: false,
                closable: true,
                isopen: false,
                model_class: "",
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "value":
                    if (newValue) {
                        this.open_modal()
                    } else {
                        this.close_modal(null, true)
                    }
                    break;
                case "closable":
                    this.data.closable = !!newValue
                    break;
                case "model_class":
                    this.data.model_class = newValue
                    break;
                default:
                    break;
            }
        }
    });


    window.addMyCustomeElement('pagination-div', class extends Webolement {
        static get observedAttributes() { return ["value", "max"]; }
        getContent() { return `
    <div class="flex row middle center" style="gap: 0.3em;">
        <button class="button fab outline" :href="(current > 1)?'#':''" @click="previous_page(event)">&laquo;</button>

        <button class="button fab outline" if="current > 1" href="#" @click="change_page(event, 1)">1</button>

        <span if="current > 4">...</span>
        <button class="button fab outline" if="current > 3" href="#" @click="change_page(event, current - 2)" :text="current - 2"></button>
        <button class="button fab outline" if="current > 2" href="#" @click="change_page(event, current - 1)" :text="current - 1"></button>
        <button class="button fab" if="current" class="active" :text="current"></button>
        <button class="button fab outline" if="max > (current + 1)" href="#" @click="change_page(event, current + 1)" :text="current + 1"></button>
        <button class="button fab outline" if="max > (current + 2)" href="#" @click="change_page(event, current + 2)" :text="current + 2"></button>

        <span if="max > (current + 3)">...</span>

        <button class="button fab outline" if="max > current" href="#" @click="change_page(event, max)" :text="max">6</button>

        <button class="button fab outline" :href="(max > current)?'#':''" href="#" @click="next_page(event)">&raquo;</button>
    </div>
` }
        constructor() {
            super();
        }
        getData() {
            return {
                current: 0,
                max: 0,
            }
        }
        previous_page(event) {
            this.change_page(event, this.data.current - 1)
        }
        next_page(event) {
            this.change_page(event, this.data.current + 1)
        }
        change_page(event, page_no) {
            event.preventDefault()
            event.stopPropagation()
            if (page_no == this.data.current || page_no < 1 || page_no > this.data.max) {
                return
            }
            var event = new InputEvent('input', {
                data: page_no,
                bubbles: true,
                cancelable: true,
            });
            this.dispatchEvent(event);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "value":
                    this.data.current = parseInt(newValue)
                    break;
                case "max":
                    this.data.max = Math.ceil(parseFloat(newValue))
                    break;

                default:
                    break;
            }
        }
    });
