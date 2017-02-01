
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD6q3h49p_htm4_dL0_HAJsBsoTCiXRTfk'
});

googleMapsClient.geocode({
  address: '46 Spadina, Toronto, ON, Canada'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results[0].geometry.location);
  }
});
