
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
