const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
    const { cityKey, CityWeather } = data;
    details.innerHTML = `<h5 class="my-3">${cityKey.EnglishName}, ${cityKey.Country.EnglishName}</h5>
<div class="my-3">${CityWeather.WeatherText}</div>
<div class="display-4 my-4">
    <span>${CityWeather.Temperature.Metric.Value}</span>
    <span>&deg;</span>
</div>`;
    const iconSrc = `img/icons/${CityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSrc = CityWeather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc);
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
};
const updateCity = async (city) => {
    const cityKey = await getCity(city);
    const CityWeather = await getWeather(cityKey.Key);

    return {
        cityKey,
        CityWeather
    };
};

cityForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city).then((data, err) => {
        updateUI(data);
    })
        .catch(err => {
            console.log(err, "there was an error");
        });
    localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
        updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    };