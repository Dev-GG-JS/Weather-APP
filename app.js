const form = document.querySelector("#form");
const search = document.querySelector("#search");
const stateSelect = document.querySelector("#state");

const list = document.querySelector(".city-section .cities");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;
  const state = stateSelect.value;

  consultAPI(city, state);
});

function consultAPI(city, state) {
  const key = "7e4ab6dc448d310b7f9e2614ebdece29";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${key}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => printDATA(data));
}

function printDATA(data) {
  const { main, name, sys, weather } = data;

  const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

  const li = document.createElement("li");

  li.classList.add("city");

  li.innerHTML = `
  <h2 class="city-name" data-name="${name},${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup>
</h2>
<div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
</div>
<figure>
  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
  <figcaption>${weather[0]["description"]}</figcaption>
</figure>
   `;

  list.appendChild(li);
}
