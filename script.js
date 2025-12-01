async function fetchWeather() {
  const searchInputEl = document.getElementById("search");
  const city = searchInputEl.value.trim();
  const weatherDataSection = document.getElementById("weather-data");
  const apiKey = "8558ba0505cdf9d8fb2dec120ea756dc";

  weatherDataSection.style.display = "block";

  if (!city) {
    weatherDataSection.style.display = "block";
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input!</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
    `;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      weatherDataSection.style.display = "flex";
      weatherDataSection.innerHTML = `
        <div>
          <h2>Could not find "${city}"</h2>
          <p>Please check the spelling and try again.</p>
        </div>
      `;
      return;
    }

    const data = await response.json();

    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
      <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="${data.weather[0].description}"
        width="100"
      />
      <div>
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${Math.round(
          data.main.temp
        )}°C</p>
        <p><strong>Feels like:</strong> ${Math.round(
          data.main.feels_like
        )}°C</p>
        <p><strong>Description:</strong> ${
          data.weather[0].description
        }</p>
      </div>
    `;
  } catch (err) {
    console.error(err);
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
      <div>
        <h2>Error</h2>
        <p>Something went wrong fetching the weather. Please try again.</p>
      </div>
    `;
  } finally {
    searchInputEl.value = "";
  }
}
