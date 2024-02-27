
class WebolementIndexDB {
    init(database_name) {
        const openRequest = indexedDB.open(database_name, 1);
        openRequest.onupgradeneeded = (e) => {
            this.db = e.target.result;
            this.upgradDB(e)
        };
        openRequest.onsuccess = (e) => {
            console.log('running onsuccess');
            this.db = e.target.result;
        };
        openRequest.onerror = (e) => {
            console.log('onerror! indexedDB doesnt work');
            console.dir(e);
        };
    }

    AddItem(table_name, item) {
        return new Promise((resolve, reject) => {
            var transaction = this.db.transaction([table_name], 'readwrite');
            var tableStore = transaction.objectStore(table_name);
            if (!item.ID) {
                return
            }
            const request = tableStore.put(item);
            request.onsuccess = (event) => {
                resolve(event, 'Data successfully added to the object store');
            };
            request.onerror = (error) => {
                reject(error, 'Error adding data to the object store');
            };
        });
    }

    AddItems(table_name, items) {
        var transaction = this.db.transaction([table_name], 'readwrite');
        var tableStore = transaction.objectStore(table_name);
        items.forEach((item) => {
            const request = tableStore.put(item);
        });
    }

    DeleteItem(table_name, id) {
        var transaction = this.db.transaction([table_name], 'readwrite');
        var objectStore = transaction.objectStore(table_name);
        return objectStore.delete(id)
    }

    DeleteAll(table_name) {
        var transaction = this.db.transaction([table_name], 'readwrite');
        var objectStore = transaction.objectStore(table_name);
        return objectStore.clear()
    }

    GetItem(table_name, id) {
        var transaction = this.db.transaction([table_name], 'readonly');
        var objectStore = transaction.objectStore(table_name);
        return objectStore.get(id)
    }

    GetItems(table_name) {
        var transaction = this.db.transaction([table_name], 'readonly');
        var objectStore = transaction.objectStore(table_name);
        try {
            const index = objectStore.index(table_name + 'UpdateIndex');
            return index.getAll()
        } catch (error) {
            return objectStore.getAll()
        }

    }

    GetItemStore(table_name) {
        var transaction = this.db.transaction([table_name], 'readonly');
        var objectStore = transaction.objectStore(table_name);
        return objectStore
    }

    upgradDB(e) {
        console.log('running onupgradeneeded');
        try {
            if (e.oldVersion < 1) {
                var branchStore = this.db.createObjectStore('Branch', { keyPath: 'ID' });
                branchStore.createIndex('BranchUpdateIndex', 'UpdatedAt', { unique: false });
                var employeeStore = this.db.createObjectStore('Employee', { keyPath: 'ID' });
                employeeStore.createIndex('EmployeeUpdateIndex', 'UpdatedAt', { unique: false });

                var attendanceSettingsStore = this.db.createObjectStore('AttendanceSettings', { keyPath: 'ID' });
                attendanceSettingsStore.createIndex('AttendanceSettingsUpdateIndex', 'UpdatedAt', { unique: false });

                var holidayStore = this.db.createObjectStore('Holiday', { keyPath: 'ID' });
                holidayStore.createIndex('HolidayUpdateIndex', 'UpdatedAt', { unique: false });
                holidayStore.createIndex('HolidayIndex', ['Year'], { unique: false });
                holidayStore.createIndex('HolidayDateIndex', ['Year', 'Month', 'Date'], { unique: true });

                var attendanceStore = this.db.createObjectStore('Attendance', { keyPath: 'ID' });
                attendanceStore.createIndex('AttendanceYearIndex', ['EmployeeID', 'Year'], { unique: false });
                attendanceStore.createIndex('AttendanceMonthIndex', ['EmployeeID', 'Year', 'Month'], { unique: false });
                attendanceStore.createIndex('AttendanceDateIndex', ['EmployeeID', 'Year', 'Month', 'Date'], { unique: true });

                attendanceStore.createIndex('AttendanceOrgYearIndex', ['Year'], { unique: false });
                attendanceStore.createIndex('AttendanceOrgMonthIndex', ['Year', 'Month'], { unique: false });
                attendanceStore.createIndex('AttendanceOrgDateIndex', ['Year', 'Month', 'Date'], { unique: false });
                
                var leaveapplicationStore = this.db.createObjectStore('LeaveApplication', { keyPath: 'ID' });
                leaveapplicationStore.createIndex('LeaveApplicationUpdateIndex', 'UpdatedAt', { unique: false });
                leaveapplicationStore.createIndex('LeaveApplicationFromIndex', ['FromIndex'], { unique: false });
                leaveapplicationStore.createIndex('LeaveApplicationFromStatusIndex', ['FromIndex', 'Status'], { unique: false });
                leaveapplicationStore.createIndex('LeaveApplicationStatusIndex', ['Status'], { unique: false });
                
                var punchlogStore = this.db.createObjectStore('PunchLog', { keyPath: 'ID' });
                punchlogStore.createIndex('PunchLogDateIndex', ['EmployeeID', 'Year', 'Month', 'Date'], { unique: false });
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export { WebolementIndexDB }

