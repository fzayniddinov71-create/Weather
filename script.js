const API_KEY = "859f19df4b4586f7545eaa5a3e02dd84";

// Dark / Light
const themeBtn = document.getElementById("themeToggle");
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent =
    document.body.classList.contains("dark") ? "☀" : "🌙";
};

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Shahar nomini yoz");

  const weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=uz`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("Shahar topilmadi");
      return;
    }

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp + "°C";
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("desc").textContent =
      data.weather[0].description;

    // AIR QUALITY
    const airUrl =
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`;

    const airRes = await fetch(airUrl);
    const airData = await airRes.json();

    const aqi = airData.list[0].main.aqi;
    const airText =
      aqi === 1 ? "Toza 😊" :
      aqi === 2 ? "Yaxshi 🙂" :
      aqi === 3 ? "O‘rtacha 😐" :
      aqi === 4 ? "Yomon 😷" : "Juda yomon ☠";

    document.getElementById("air").textContent = airText;

    document.getElementById("weatherCard").classList.add("show");

  } catch (e) {
    alert("Internet yoki API xatosi");
  }
}

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
