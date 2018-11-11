function connect(url) {
  App.moves = App.cable.subscriptions.create({
      "channel": 'MovesChannel',
      "url": url
    }, {
    received: function(data) {
      $("#moves").removeClass('hidden')
      data = JSON.parse(data)
      $('#moves').append("<p> <b>" + data.user + ": </b>" + data.move + "</p>");
    }
  });
}
