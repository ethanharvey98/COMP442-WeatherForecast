var request = new XMLHttpRequest();

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
    
  // Variables for GET request
  api_url = "http://forecast.weather.gov/MapClick.php";
  lat = crd.latitude;
  lon = crd.longitude;
  FcstType = "json"

  // GET request
  request.open('GET', api_url + "?lat=" + lat + "&lon=" + lon + "&FcstType=" + FcstType, true)
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    // Populate Data
    $("#forecast").after(JSON.stringify(data));
  }
  request.send();
    
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);