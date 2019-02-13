function connect(hsh) {
  App.moves = App.cable.subscriptions.create({
      "channel": 'MovesChannel',
      "hsh": hsh
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


function generateColor(name) {
  var data = [];
  for (var i = 0; i < name.length; i++){
      data.push(name.charCodeAt(i));
  }
  let randomNumber = data.reduce((total, num)=>{return total + num})
  return '#' + Math.floor((Math.abs(Math.sin(randomNumber) * 16777215)) % 16777215).toString(16).padStart(6, '0');
}

update_preview_circle = () => {
  name = document.getElementById("name").value
  document.getElementById("preview_circle").style.color = generateColor(name);
}

channel = ()
