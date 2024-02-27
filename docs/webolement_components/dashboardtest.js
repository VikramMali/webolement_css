
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
