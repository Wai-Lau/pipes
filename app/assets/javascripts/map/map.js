let GLOBAL_MAP = null;
let USERS = {}
let CURRENT_POSITION = {}

// We take keys and markers so that we can populate the map with all active
initMap = () => {
    console.log('initializing map!!')
    GLOBAL_MAP = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 20
    });
    var infoWindow = new google.maps.InfoWindow({map: GLOBAL_MAP});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            placeAndBindMarker(pos, 'white', 'blue');

            CURRENT_POSITION = pos;
            
            GLOBAL_MAP.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, GLOBAL_MAP.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, GLOBAL_MAP.getCenter());
    }
}

placeAndBindMarker = (latLng, borderColor, filledColor) => {
    new google.maps.Marker({
      position: latLng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: filledColor,
        strokeColor: borderColor,
        opacity: 0.9,
        strokeWeight: 5,
        fillOpacity: 1,
        scale: 10
      },
      map: GLOBAL_MAP
    });
}