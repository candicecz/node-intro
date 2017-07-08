var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return console.log(Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2)));

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

function getAddressPosition(address) {
  return request('https://maps.googleapis.com/maps/api/geocode/json?address=' + address +"&key=AIzaSyAR04V6RBFODLrLJqGOv24Kp9-hBHCO8Mo")
    .then(function(location){
      var data = JSON.parse(location)
      var location= data.results[0].geometry.location;
      return location;
    })
}


function getCurrentTemperatureAtPosition(position) {
  return request ("https://api.darksky.net/forecast/e6cf3a039cddf2244390b39912a08607/" + position.lat + "," + position.lng)
  .then(
    function(response){
      var data = JSON.parse(response);
      var temperature = data.currently.temperature;
      return console.log(temperature);
    }
  )
}

function getCurrentTemperature(address) {
    getAddressPosition(address)
    .then(
      function(response){
        getCurrentTemperatureAtPosition(response)
      }
    )
}

function getDistanceFromIss(address) {
  Promise.all(
    [getIssPosition(), getAddressPosition(address)]
  )
  .then(
    function(data){
      var issPosition = data[0];
      var getAddressPosition = data[1];
      getDistance(issPosition,getAddressPosition);
    })
}
getDistanceFromIss("montreal");
