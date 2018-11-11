function updateUserPosition(position) {
    if (CURRENT_POSITION.lat != position.lat && CURRENT_POSITION.lng != position.lng) {
        $.ajax({
            url: "http://localhost:3000/moves",
            method: "POST",        
            data: {
                move : {
                    content: position,
                    game_id: "lol"
                }
            },
            contentType: "multipart/form-data",
            success: function(data){
                console.log(data);
            },
            error: function(errMsg) {
                alert(JSON.stringify(errMsg));
            }
        });
    }
}

function success(pos) {
    console.log(JSON.stringify(pos.coords));
    let position = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
    }
    updateUserPosition(JSON.stringify(position));
    console.log(position);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  var options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };
  
  function getCurrentLocation() {
    console.log('getting current location')
    return navigator.geolocation.watchPosition(success, error, options)
  }
  
  getCurrentLocation();