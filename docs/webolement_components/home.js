
    window.addMyCustomeElement('home-div', class extends Webolement {
        getContent() { return `
    <div>
        <h1>Home Page</h1>
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
