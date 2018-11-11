function updateUserPosition(position) {
    console.log('sending ajax')
    $.ajax({
        url: "http://localhost:3000/moves",
        method: "POST",        
        data: {
            move : {
                content: position,
                url: GLOBAL_URL
            }
        },
        contentType: "multipart/form-data",
        success: function(data){
            console.log(data);
        },
        error: function(errMsg) {
            console.error(JSON.stringify(errMsg));
        }
    });
}

function success(pos) {
    console.log(pos.coords);
    let position = {
        lat: pos.lat,//pos.coords.latitude,
        lng: pos.lng//pos.coords.longitude
    }
    updateUserPosition(position);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  var options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };
  
  function getCurrentLocation() {
    let defaultPos = {lat: randomLat(), lng: randomLng()};
    console.log(defaultPos)
    success(defaultPos);
    //return navigator.geolocation.getCurrentPosition(success, error, options)
  }
  
  getCurrentLocation();
  setInterval(getCurrentLocation, 2000);