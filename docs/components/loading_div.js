
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
