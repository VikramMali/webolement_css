
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
