// JS file to manipulate the DOM

const cityForm = document.querySelector("form")



const updateCity = async (city) => {
const cityKey = await getCity(city);
const CityWeather = await getWeather(cityKey.Key);

return {cityDetails: cityKey,
        weather: CityWeather
}
}

cityForm.addEventListener("submit", e =>{
    e.preventDefault();
    const city =  cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city).then((data, err ) =>{
            console.log(data)}) 
        .catch(err => {
            console.log(err, "there was an error")
        });
});
