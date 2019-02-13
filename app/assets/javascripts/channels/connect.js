USERS = []

function connect(hsh) {
  App.moves = App.cable.subscriptions.create({
      "channel": 'MovesChannel',
      "hsh": hsh
    }, {
    received: function(data) {
      console.log('doin something')
      data = JSON.parse(data)
      let position = data.move;
      position.lat = parseFloat(position.lat)
      position.lng = parseFloat(position.lng)
      let user = data.user;
      console.log(position)
      if (USERS[user] != undefined) {
        remove(USERS[user])
      }
    }
  });
}

