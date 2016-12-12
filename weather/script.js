$(document).ready(function() {
  
  function setWeather(data) {
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    url += '?lat=' + data.lat + '&lon=' + data.lon + '139&units=metric&callback=?';
    url += '&APPID=c459d734530a9c63b1255d24285d50d8'
    $.getJSON(url).done(function(e) {
      $("#city").text(e.name);
      $("#temp").text("Temp: " + e.main.temp + " C");
      $("#wind").text("Wind: " + e.wind.speed + " m/s");
      $("#weather").text(e.weather[0].description);
    });
  }
  
  $.getJSON('http://ip-api.com/json/?callback=?').done(function(data) {
    setWeather(data);
  })
  
});