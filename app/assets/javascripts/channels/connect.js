USERS = {}

function connect(hsh) {
  App.moves = App.cable.subscriptions.create({
      "channel": 'MovesChannel',
      "hsh": hsh
    }, {
    received: function(data) {
      data = JSON.parse(data)
      console.log(data);
      let user = data.user;
      let position = data.move;
      let new_u = false;
      if (!USERS[user]) {
        USERS[user] = {}
        new_u = true
      }
      addOrUpdateMarker(position, user)
      if (new_u) {
        center_camera(0)
      } else {
        center_camera()
      }
    }
  });
}

center_camera = (speed=1000) => {
  let x = Object.keys(USERS).reduce(function (previous, key) {
      return previous + USERS[key]["marker"].getCoordinates()["x"];
  }, 0);
  let y = Object.keys(USERS).reduce(function (previous, key) {
      return previous + USERS[key]["marker"].getCoordinates()["y"];
  }, 0);
  users_count = Object.keys(USERS).length
  let average_x = x/users_count;
  let average_y = y/users_count;
  let dist = max_distance();
  let zoom = select_zoom(dist)
  let pitch = zoom*3
  let delta_zoom = Math.abs(MAP._zoomLevel - zoom);
  changeView(average_x, average_y, zoom, (2+delta_zoom)*speed, pitch);
}

select_zoom = (x) => {
  if (x < 0.001) return 18
  if (0.001 < x && x <= 0.01) return interpolate(x,0.001,0.01,18,16)
  if (0.01 < x && x <= 0.25) return interpolate(x,0.01,0.25,16,11)
  if (0.25 < x && x <= 0.5) return interpolate(x,0.25,0.5,11,10)
  if (0.5 < x && x <= 1) return interpolate(x,0.5,1,10,9)
  if (1 < x && x <= 2) return interpolate(x,1,2,9,8)
  if (2 < x && x <= 10) return interpolate(x,2,10,8,6)
  if (10 < x && x <= 20) return interpolate(x,10,20,6,5)
  if (20 < x && x <= 100) return interpolate(x,20,100,5,2.5)
  if (100 < x) return 2.5;
}

max_distance = () => {
  max = 0;
  for (u in USERS) {
    for (v in USERS) {
      let x_1 = USERS[u]["marker"].getCoordinates()["x"]
      let x_2 = USERS[v]["marker"].getCoordinates()["x"]
      let y_1 = USERS[u]["marker"].getCoordinates()["y"]
      let y_2 = USERS[v]["marker"].getCoordinates()["y"]
      let dist = Math.sqrt((x_1-x_2)**2+(y_1-y_2)**2)
      if (dist > max) max = dist
    }
  }
  return max
}

interpolate = (x, x_1, x_2, y_1, y_2) => {
  return y_1 + (((y_2-y_1)/(x_2-x_1))*(x-x_1))
}
