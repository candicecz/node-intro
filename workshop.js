var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
    return request('http://api.open-notify.org/iss-now.json')
        .then(function(response) {
                var data = JSON.parse(response)
                data.iss_position.lat = data.iss_position.latitude;
                data.iss_position.lng = data.iss_position.longitude;
                delete data.iss_position.latitude;
                delete data.iss_position.longitude;;


                return data.iss_position;
            });
}

getIssPosition()
.then(function(position) {
    return ('The position of the ISS is ', position);
})
.catch(function(error) {
    return ('Something went wrong', error.stack);
});

function getAddressPosition() {
  return request('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBKV7tMipn-yxf_DsTtlsO6Iidv05D2S6o')
    .then(function(location){
      var data = JSON.parse(location)
      return data.results[0].geometry.location;
    })
}

getAddressPosition()
.then(function(location){
    return ('The coordinates of the location are', location);
})
.catch(function(error){
    return ('Something went wrong', error.stack);
});


function getCurrentTemperatureAtPosition(position) {
  return request('https://api.darksky.net/forecast/e6cf3a039cddf2244390b39912a08607/37.8267,-122.4233')
    .then(function(temperature){
      var data = JSON.parse(temperature)
      console.log(data.currently.temperature);
      return data.currently.temperature
    })
  }


getCurrentTemperatureAtPosition()
  .then(function(temperature){
    console.log('The current temperature at this position is ', temperature);
  })
  .catch(function(error){
    console.log('Something went wrong', error.stack);
  });



function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {

}
