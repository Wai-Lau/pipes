let GLOBAL_MAP = null;

let USERS = {}


initMap = () => {
    console.log('initializing map!!')

    GLOBAL_MAP = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3508224, lng: -71.108409999999},
        zoom: 19
    });
    //var infoWindow = new google.maps.InfoWindow({map: GLOBAL_MAP});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log('Updating default position')
            updateUserPosition(pos)
            
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
    return new google.maps.Marker({
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

placeAndBindMarkerDefault = () => {
    CURRENT_POSITION = new google.maps.Marker({
      position: {lat: -34.397, lng: 150.644},
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        strokeColor: 'white',
        opacity: 0.9,
        strokeWeight: 5,
        fillOpacity: 1,
        scale: 10
      },
      map: GLOBAL_MAP
    });
}

remove = (marker) => {
    marker.setMap(null); // set markers setMap to null to remove it from map
};