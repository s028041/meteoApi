window.addEventListener("load", () => {
  // let long;
  // let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let location = document.querySelector(".location-timezone");
  let timeUtc = document.querySelector(".time-utc");

  if (navigator.geolocation) {
    //true
    //alert("Lets get the location");
    navigator.geolocation.getCurrentPosition(position => {
      // long = position.coords.longitude;
      // lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.meteo.lt/v1/places/vilnius/forecasts/long-term`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {
            airTemperature,
            conditionCode,
            forecastTimeUtc
          } = data.forecastTimestamps[0];
          const { name } = data.place;
          //Set DOM Elements from the API
          temperatureDegree.textContent = airTemperature;
          temperatureDescription.textContent = conditionCode;
          timeUtc.textContent = forecastTimeUtc;
          location.textContent = name;
        });
    });
  }
});
