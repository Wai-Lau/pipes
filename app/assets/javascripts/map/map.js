let GLOBAL_MAP = null;

// We will have key: user and value: the marker pointer
// When new user values are received, we erase everything on the map (iterate through all users)
// Then, we repopulate everyone again 
let USERS = {}

minValue = -100;
maxValue = 100;
function randomFloat(precision){
    if(typeof(precision) == 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

maxLng = -71.108299
minLng = -71.108436
function randomLng(precision){
    if(typeof(precision) == 'undefined'){
        precision = 6;
    }
    return parseFloat(Math.min(minLng + (Math.random() * (maxLng - minLng)),maxLng).toFixed(precision));
}

maxLat = 42.351092
minLat = 42.350964
function randomLat(precision){
    if(typeof(precision) == 'undefined'){
        precision = 6;
    }
    return parseFloat(Math.min(minLat + (Math.random() * (maxLat - minLat)),maxLat).toFixed(precision));
}


initMap = () => {
    console.log('Initializing map')

    let defaultPos = {lat: randomLat(), lng: randomLng()};
    GLOBAL_MAP = new google.maps.Map(document.getElementById('map'), {
        center: defaultPos,
        zoom: 19
    });
    updateUserPosition(defaultPos); //TO REMOVE BEFORE PRODUCTION
    //var infoWindow = new google.maps.InfoWindow({map: GLOBAL_MAP});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //updateUserPosition(pos)
            
            //GLOBAL_MAP.setCenter(pos);
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

remove = (marker) => {
    marker.setMap(null); // set markers setMap to null to remove it from map
};