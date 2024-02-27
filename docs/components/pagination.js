
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
