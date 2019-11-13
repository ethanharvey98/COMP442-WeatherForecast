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

    //$("#forecast").after(JSON.stringify(data));
    var row;

    for (var i = 0; i < 10; i++) {

      var col = document.createElement('div');
      col.setAttribute('class', 'col-sm-6 col-12');
      var header = document.createElement('h3');
      var status = document.createElement('h6');
      var temp = document.createElement('h6');
      col.append(header);
      col.append(status);
      col.append(temp);
      header.innerHTML = data.time.startPeriodName[i];
      status.innerHTML = data.data.weather[i];
      temp.innerHTML = data.data.temperature[i];

      var img = document.createElement('img');
      img.src = data.data.iconLink[i];
      col.append(img);

      if (i%2 === 0) {
        row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.append(col);
      } else {
        row.append(col);
        $("#forecast").append(row);
      }
    }

  }
  request.send();
    
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);