const API_KEY = "a833ac0f01d022c0bea9835af0001185";

// ELEMENTLAR
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const card = document.getElementById("weatherCard");

const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".desc");
const humEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const rainEl = document.querySelector(".rain");
const aqiEl = document.querySelector(".aqi");

// QIDIRISH
btn.addEventListener("click", () => {
  if (input.value !== "") getWeather(input.value);
});

// 🌦 WEATHER
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=uz&appid=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  tempEl.textContent = `🌡 Harorat: ${data.main.temp} °C`;
  descEl.textContent = `☁ Holat: ${data.weather[0].description}`;
  humEl.textContent = `💧 Namlik: ${data.main.humidity} %`;
  windEl.textContent = `💨 Shamol: ${data.wind.speed} m/s`;

  if (data.rain) {
    rainEl.textContent = "🌧 Yomg‘ir yog‘moqda";
  } else if (data.snow) {
    rainEl.textContent = "❄ Qor yog‘moqda";
  } else {
    rainEl.textContent = "☀ Yog‘ingarchilik yo‘q";
  }

  card.classList.add("show");

  getAirQuality(data.coord.lat, data.coord.lon);
}

// 🌫 AIR QUALITY
async function getAirQuality(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const aqi = data.list[0].main.aqi;

  if (aqi === 1) aqiEl.textContent = "🟢 Havo sifati: Juda yaxshi";
  if (aqi === 2) aqiEl.textContent = "🟡 Havo sifati: Yaxshi";
  if (aqi === 3) aqiEl.textContent = "🟠 Havo sifati: O‘rtacha";
  if (aqi === 4) aqiEl.textContent = "🔴 Havo sifati: Yomon";
  if (aqi === 5) aqiEl.textContent = "☠ Juda xavfli";
}

// 🌙 DARK / LIGHT
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});

// 📦 PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
