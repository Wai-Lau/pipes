let GLOBAL_URL;

function connect(url) {
  GLOBAL_URL = url;
  App.moves = App.cable.subscriptions.create({
      "channel": 'MovesChannel',
      "url": GLOBAL_URL
    }, {
    received: function(data) {
      console.log('doin something')
      $("#moves").removeClass('hidden')
      data = JSON.parse(data)
      let position = data.move;
      position.lat = parseFloat(position.lat)
      position.lng = parseFloat(position.lng)
      let user = data.user;
      console.log(position)
      if (USERS[user] != undefined) {
        remove(USERS[user])
      }
      USERS[user] = placeAndBindMarker(position, generateColor(user), generateColor(user + 'aAA'))
      $('#moves').append("<p> <b>" + user + ": </b>" + position + "</p>");
    }
  });
}


function generateColor(url) {
  var data = [];
  for (var i = 0; i < url.length; i++){
      data.push(url.charCodeAt(i));
  }
  let randomNumber = data.reduce((total, num)=>{return total + num})
  return '#' + Math.floor((Math.abs(Math.sin(randomNumber) * 16777215)) % 16777215).toString(16).padStart(6, '0');
}
