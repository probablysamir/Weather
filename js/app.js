let index=0;
const apiKey = 'cb6c158dc579e4c704075bd0d42e065a';
let searchText = document.querySelector('#search-text');
let inputContainer = document.querySelector('#input-container');
let backBtn = document.querySelector(".topic-head i")
let displayWeather = document.querySelector('#display-weather');
let weatherIcon = document.querySelector('#weatherIcon');
let temperature = document.querySelector('.temperature');
let locationText = document.querySelector('.location-text');
let weatherCondition = document.querySelector('.weather-condition');
let humidityPerc = document.querySelector('#humidity-perc');
let feelTemp = document.querySelector('#feel-temp');
const searchBtn = document.querySelector('.search-btn');
const weatherDetails = [];

//Asynchronous function to get data from the API
const getData = async (resource) => {
    const response = await fetch(resource);
    if (response.status != 200) {
        throw new Error("Could not fetch data");
    }
    const data = await response.json();
    return data;
}

//Adding event listeners
searchBtn.addEventListener('click',()=>{
    if(searchText.value!='') {
        const resource = `https://api.openweathermap.org/data/2.5/weather?q=${searchText.value}&units=metric&appid=${apiKey}`;
        getData(resource).then(data => {
            weatherDetails.push(data);
            console.log(weatherDetails);
            showWeather();
        })
    }
})

//Function to display the weather
function showWeather(){
    weatherIcon.src = `./icons/${weatherDetails[index].weather[0].icon}.svg`
    temperature.innerText = `${weatherDetails[index].main.temp}°C`;
    locationText.innerText = `${weatherDetails[index].name}, ${weatherDetails[index].sys.country}`;
    weatherCondition.innerText = weatherDetails[index].weather[0].description;
    feelTemp.innerText = `${weatherDetails[index].main.feels_like}°C`;
    humidityPerc.innerText = `${weatherDetails[index].main.humidity} %`;
    inputContainer.style.display = 'none';
    displayWeather.style.display = 'flex';
    backBtn.style.display = 'inline-block';
    searchText.value='';
}

backBtn.addEventListener('click',()=>{
    backBtn.style.display = 'none';
    displayWeather.style.display = 'none';
    inputContainer.style.display = 'block';
    index++;
})