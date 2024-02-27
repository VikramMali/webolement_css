window.WebSocketEventHandlers = {}

window.add_ws_event_handler = (event, handler)=>{
    if (!window.WebSocketEventHandlers[event]) {
        window.WebSocketEventHandlers[event] = []
    }
    window.WebSocketEventHandlers[event].push(handler)
    return window.WebSocketEventHandlers[event].length - 1
}

window.remove_ws_event_handler = (event, index_to_delete)=>{
    if (!window.WebSocketEventHandlers) {
        return
    }
    if (!window.WebSocketEventHandlers[event]) {
        return
    }
    if(index_to_delete > -1){
        window.WebSocketEventHandlers[event].splice(index_to_delete, 1);
    }
}

class MyWebsocket {
    constructor() {
        window.add_ws_event_handler('switched', (data)=>{
            if(this.socket){
                this.socket.close()
            }
        })
        window.add_ws_event_handler('incoming_call', (data)=>{
            var path = "/call/"+data.ID
            webe_navigate(path)
        })
        this.set_websocket()
    }
    panding_actions = []
    send(action, data = {}) {
        var request = {}
        request[action] = data
        if(!this.socket){
            this.set_websocket()
            this.panding_actions.push({
                action : action,
                data : data
            })
        }else{
            try {
                this.socket.send(JSON.stringify(request))
            } catch (error) {
                this.panding_actions.push({
                    action : action,
                    data : data
                })
            }            
        }
    }
    set_websocket() {
        if(this.socket){
            return
        }
        var device_string = localStorage.getItem("Device")
        if(device_string){
            try {
                this.Device = JSON.parse(device_string)
            } catch (error) {
                console.log(error)
            }
        }
        if(!this.Device){
            return
        }
        var socketProtocol = "ws://"
        if (window.location.protocol == "https:") {
            socketProtocol = "wss://"
        }
        var url = new URL(socketProtocol + window.location.host + "/api/ws");

        try {
            this.socket = new WebSocket(url.href);
        } catch (error) {
            console.log(error)
            return
        }
        this.socket.onopen = () => {
            this.online = true
            this.send("set_device", { "device_token" : this.Device.DeviceToken})
            if(this.panding_actions.length){
                for (let index = 0; index < this.panding_actions.length; index++) {
                    const panding_action = this.panding_actions[index];
                    this.send(panding_action.action, panding_action.data)
                }
            }
            this.panding_actions = []
            this.on_ws_status_changed()
        };

        this.socket.onclose = event => {
            this.socket = null
            this.online = false
            this.message = event.reason
            this.on_ws_status_changed()
        };

        this.socket.onmessage = event => {
            var events = JSON.parse(event.data);
            Object.keys(events).forEach(event => {
                console.log("Received socket event")
                console.log(event)
                if (window.WebSocketEventHandlers && window.WebSocketEventHandlers[event]) {
                    for (let index = 0; index < window.WebSocketEventHandlers[event].length; index++) {
                        window.WebSocketEventHandlers[event][index](events[event]);
                    }
                }
            });
        }

        this.socket.onerror = error => {
            this.error = true
            console.log("Socket Error: ", error);
            this.message = "Socket Error: " + error.currentTarget.readyState  
            this.on_ws_status_changed()          
        };
    }
    on_ws_status_changed = debounce((request_data) => {
        var event ="ws_status_changed"
        var event_data = {
            online : this.online,
            message : this.message
        }
        if (window.WebSocketEventHandlers && window.WebSocketEventHandlers[event]) {
            for (let index = 0; index < window.WebSocketEventHandlers[event].length; index++) {
                window.WebSocketEventHandlers[event][index](event_data);
            }
        }
    }, 100)
}