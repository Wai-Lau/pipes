MAP = {}
LAYER = {}

createMap = () => {
  MAP = new maptalks.Map('map', {
    center: [0,20],
    zoom: 2.5,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ['a','b','c','d'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy;'
    })
  });

  LAYER = new maptalks.VectorLayer('v').addTo(MAP);
}

addOrUpdateMarker = (position, name) => {
  lat = position["lat"]
  lng = position["lng"]

  if (USERS[name]["marker"]) {
    delta = offset(USERS[name]["marker"].getCoordinates(), position)
    USERS[name]["marker"].bringToFront().animate({
      translate: [delta['lng'], delta['lat']]
    }, {
      duration: 5000,
    });
  } else {
    USERS[name]["marker"] = new maptalks.Marker(
      [lng, lat],
      {
        'symbol' : {
          'markerType': 'ellipse',
          'markerFill': '#ffffff',
          'markerFillOpacity': 0.2,
          'markerLineColor': generateColor(name),
          'markerLineWidth': 3,
          'markerLineOpacity': 1,
          'markerLineDasharray':[],
          'markerWidth': 18,
          'markerHeight': 18,
          'markerDx': 0,
          'markerDy': 0,
          'markerOpacity' : 1,
          'textFaceName' : 'sans-serif',
          'textName' : '    '+name,
          'textFill' : '#34495e',
          'textHorizontalAlignment' : 'right',
          'textSize' : 18,
          'shadowBlur' : 20,
          'shadowOffsetX' : 2,
          'shadowOffsetY' : 2,
        }
      }
    ).addTo(LAYER);
  }
}

offset = (start, finish) => {
  return {"lng": (finish["lng"] - start["x"]),
          "lat": (finish["lat"] - start["y"])}
}

changeView = (x, y, zoom, duration, pitch) => {
  MAP.animateTo({
    center: [x, y],
    zoom: zoom,
    pitch: pitch,
  }, {
    duration: duration
  });
}
