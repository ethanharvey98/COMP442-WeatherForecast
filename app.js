var request = new XMLHttpRequest();

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  // Variable dictionary
  var row, col, box;

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
    
    // Populate Page
    row = document.createElement('div');
    row.setAttribute('class', 'row no-gutters');

    if (data.time.startValidTime[0].substring(0,10) === data.time.startValidTime[1].substring(0,10)) {
      col = document.createElement('div');
      col.setAttribute('class', 'col-sm-6 col-12');
      row.append(col);
    }

    for (var i = 0; i < data.data.iconLink.length; i++) {

      // Define col
      col = document.createElement('div');
      col.setAttribute('class', 'col-sm-6 col-12');

      // Define box
      box = document.createElement('div');
      box.setAttribute('class', 'basicbox');

      // Append box to col
      col.append(box);

      // Define header, status, and temp
      var header = document.createElement('h3');
      var status = document.createElement('h6');
      var temp = document.createElement('h6');

      // Append header, status, and temp to box
      box.append(header);
      box.append(temp);
      box.append(status);

      // Fill header, status, and temp
      header.innerHTML = data.time.startPeriodName[i];
      temp.innerHTML = data.data.temperature[i] + " degrees Fahrenheit";
      status.innerHTML = data.data.weather[i];


      // Define img
      var img = document.createElement('img');

      // Append img to box
      box.append(img);

      // Fill img
      img.src = data.data.iconLink[i];

      // If there is another forecast
      if (data.time.startValidTime[i+1]) {
        // If the next forecast is the next day
        if (data.time.startValidTime[i].substring(0,10) === data.time.startValidTime[i+1].substring(0,10)) {
          row = document.createElement('div');
          row.setAttribute('class', 'row no-gutters');
          row.append(col);
        }
        // If the forecast is the same day
        else {
          row.append(col);
          $("#forecast").append(row);
        }
      }
    }
  }
  request.send();
    
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);