GLOBAL_HOST = "";
GLOBAL_HSH = "";
GLOBAL_NAME = "";

function updateUserPosition(position) {
    console.log(`sending ajax to ${GLOBAL_HOST}/moves`)
    $.ajax({
      url: GLOBAL_HOST + "/moves",
      method: "POST",
      data: {
          move : {
              user: GLOBAL_NAME,
              content: position,
              hsh: GLOBAL_HSH
          }
      },
      contentType: "multipart/form-data",
      success: function(data){
        console.log(204);
      },
      error: function(errMsg) {
          console.log(JSON.stringify(errMsg));
      }
  });

}

function success(pos) {
  let position = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
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
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error, options)
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function startUpdating() {
  getCurrentLocation();
}
