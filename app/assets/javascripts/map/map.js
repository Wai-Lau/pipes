let GLOBAL_MAP = null;
let USERS = {}
let CURRENT_POSITION = {}


initMap = () => {
    console.log('initializing map!!')
    GLOBAL_MAP = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 5
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
            console.error("nope");
        });
    } else {
        // Browser doesn't support Geolocation
        console.log('whatever');
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