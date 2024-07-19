// script.js
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '24eae09680ead619d39c4c1a5a1acdc6';
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchBtn');
  const errorDiv = document.getElementById('error');
  const weatherInfoDiv = document.getElementById('weatherInfo');
  const cityNameEl = document.getElementById('cityName');
  const dateTimeEl = document.getElementById('dateTime');
  const weatherIconEl = document.getElementById('weatherIcon');
  const temperatureEl = document.getElementById('temperature');
  const weatherDescriptionEl = document.getElementById('weatherDescription');
  const feelsLikeEl = document.getElementById('feelsLike');
  const humidityEl = document.getElementById('humidity');
  const windSpeedEl = document.getElementById('windSpeed');
  const modeSwitch = document.getElementById('modeSwitch');

  searchBtn.addEventListener('click', async () => {
      const city = cityInput.value.trim();
      if (!city) {
          showError('Please enter a city or state.');
          return;
      }

      try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
          if (!response.ok) {
              throw new Error('City not found');
          }

          const data = await response.json();
          updateWeatherInfo(data);
      } catch (error) {
          showError(error.message);
      }
  });

  modeSwitch.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
  });

  function showError(message) {
      errorDiv.textContent = message;
      weatherInfoDiv.style.display = 'none';
  }

  function updateWeatherInfo(data) {
      const { name, main, weather, wind, dt } = data;
      const date = new Date(dt * 1000);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      cityNameEl.textContent = name;
      dateTimeEl.textContent = formattedDate;
      weatherIconEl.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
      temperatureEl.textContent = `${main.temp}°C`;
      weatherDescriptionEl.textContent = weather[0].description;
      feelsLikeEl.textContent = `${main.feels_like}°C`;
      humidityEl.textContent = `${main.humidity}%`;
      windSpeedEl.textContent = `${wind.speed} m/s`;

      errorDiv.textContent = '';
      weatherInfoDiv.style.display = 'block';
  }
});
