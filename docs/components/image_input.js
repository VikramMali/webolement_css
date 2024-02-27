
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
