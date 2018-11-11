let GLOBAL_MAP = null;

// We will have key: user and value: the marker pointer
// When new user values are received, we erase everything on the map (iterate through all users)
// Then, we repopulate everyone again 
let USERS = {}
let CURRENT_POSITION = {}

minValue = -180;
maxValue = 180;
function randomFloat(precision){
    if(typeof(precision) == 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}


initMap = () => {
    console.log('initializing map!!')

    let defaultPos = {lat: randomFloat(), lng: randomFloat()};
    GLOBAL_MAP = new google.maps.Map(document.getElementById('map'), {
        center: defaultPos,
        zoom: 5
    });
    console.log(defaultPos)
    updateUserPosition(defaultPos); //TO REMOVE BEFORE PRODUCTION
    var infoWindow = new google.maps.InfoWindow({map: GLOBAL_MAP});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            placeAndBindMarker(pos, 'white', 'blue');
            updateUserPosition(pos)
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

updateAllUserLocations = (newUserPositions) => {
    console.log('updating');
    for (let user in USERS) {
        remove(USERS[user]) //Getting rid of outdated markers
        USERS[user] = placeAndBindMarker(newUserPositions[user], 'blue', 'blue')
    }
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

removeDefault = () => {
    console.log(CURRENT_POSITION)
    CURRENT_POSITION.setMap(null); // set markers setMap to null to remove it from map
};