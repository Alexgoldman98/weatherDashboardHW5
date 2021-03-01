//global variables
var cities = []

//check local storage to see if city already exists
if (localStorage.getItem("cityList") !== null) {
    cities = JSON.parse(localStorage.cityList);
    document.querySelector('#cityList').innerHTML = "";
    for (i = 0; i < cities.length; i++) {
        document.querySelector('#cityList').innerHTML += `<li class="list-group-item">${cities[i]}</li>`;
    }
}

// get city data
async function getData() {
    var city = document.querySelector('#cityInput').value;
    var cityName = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e94155b41181a95092f569ee46d67e1`).then( r=>r.json())
    cities.push(city);

    lat = cityName.coord.lat
    lon = cityName.coord.lon

    var cityInfo = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=7e94155b41181a95092f569ee46d67e1`).then( r=>r.json())

    console.log(cityInfo)

    var temp = cityInfo.current.temp;
    var humid = cityInfo.current.humidity;
    var wind = cityInfo.current.wind_speed;
    var uv = cityInfo.current.uvi
    var icon = cityInfo.current.weather[0].icon;

    if(uv >= 0 && uv <= 2){
        document.querySelector('#uv').style.backgroundColor = "green";
        document.querySelector('#uv').style.color = "white";
    } else if(uv >= 3 && uv <= 5){
        document.querySelector('#uv').style.backgroundColor = "yellow";
        document.querySelector('#uv').style.color = "black";
    } else if(uv >= 6 && uv <= 7){
        document.querySelector('#uv').style.backgroundColor = "orange";
    } else if(uv >= 11 && uv <= 10){
        document.querySelector('#uv').style.backgroundColor = "red";
        document.querySelector('#uv').style.color = "white";
    } else if(uv >= 11){
        document.querySelector('#uv').style.backgroundColor = "purple";
    }

    var dayOne = {
        timeOne: moment().add(1, 'days').format('MMMM Do'),
        temp: cityInfo.daily[1].temp.day,
        humid: cityInfo.daily[1].humidity,
        icon: cityInfo.daily[1].weather[0].icon,
    }

    var dayTwo = {
        timeTwo: moment().add(2, 'days').format('MMMM Do'),
        temp: cityInfo.daily[2].temp.day,
        humid: cityInfo.daily[2].humidity,
        icon: cityInfo.daily[2].weather[0].icon,
    }

    var dayThr = {
        timeThr: moment().add(3, 'days').format('MMMM Do'),
        temp: cityInfo.daily[3].temp.day,
        humid: cityInfo.daily[3].humidity,
        icon: cityInfo.daily[3].weather[0].icon,
    }

    var dayFou = {
        timeFou: moment().add(4, 'days').format('MMMM Do'),
        temp: cityInfo.daily[4].temp.day,
        humid: cityInfo.daily[4].humidity,
        icon: cityInfo.daily[4].weather[0].icon,
    }

    var dayFiv = {
        timeFiv: moment().add(5, 'days').format('MMMM Do'),
        temp: cityInfo.daily[5].temp.day,
        humid: cityInfo.daily[5].humidity,
        icon: cityInfo.daily[5].weather[0].icon,
    }

    showWeather(cityName, temp, humid, wind, uv, icon)

    dayOneShow(dayOne.timeOne, dayOne.icon, dayOne.temp, dayOne.humid)

    dayTwoShow(dayTwo.timeTwo, dayTwo.icon, dayTwo.temp, dayTwo.humid)

    dayThrShow(dayThr.timeThr, dayThr.icon, dayThr.temp, dayThr.humid)

    dayFouShow(dayFou.timeFou, dayFou.icon, dayFou.temp, dayFou.humid)

    dayFivShow(dayFiv.timeFiv, dayFiv.icon, dayFiv.temp, dayFiv.humid)

    localStorageList()

}
// show city specific weather
function showWeather(cityName, temp, humid, wind, uv, icon) {
    var currentDate = moment().format('MMMM Do YYYY');

    //show current weather
    document.getElementById('cityCard').innerHTML = `<h3> ${cityName.name} | ${currentDate} <img src="https://openweathermap.org/img/wn/${icon}.png"/> </h3>`
    document.getElementById('temp').innerHTML = `${temp}°`
    document.getElementById('humid').innerHTML = `Humidity: ${humid}`
    document.getElementById('wind').innerHTML = `Wind: ${wind}`
    document.getElementById('uv').innerHTML = `UV: ${uv}`
}
function dayOneShow(timeOne, icon, temp, humid) {
    document.getElementById('dayOne').innerHTML = `${timeOne}`;
    document.getElementById('iconOne').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="w-50"/>`;
    document.getElementById('tempOne').innerHTML = `${temp}°`;
    document.getElementById('humidOne').innerHTML = `Humidity: ${humid}`;
}
function dayTwoShow(timeTwo, icon, temp, humid) {
    document.getElementById('dayTwo').innerHTML = `${timeTwo}`;;
    document.getElementById('iconTwo').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="w-50"/>`;
    document.getElementById('tempTwo').innerHTML = `${temp}°`;
    document.getElementById('humidTwo').innerHTML = `Humidity: ${humid}`;
}
function dayThrShow(timeThr, icon, temp, humid) {
    document.getElementById('dayThr').innerHTML = `${timeThr}`;;
    document.getElementById('iconThr').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="w-50"/>`;
    document.getElementById('tempThr').innerHTML = `${temp}°`;
    document.getElementById('humidThr').innerHTML = `Humidity: ${humid}`;
}
function dayFouShow(timeFou, icon, temp, humid) {
    document.getElementById('dayFou').innerHTML = `${timeFou}`;;
    document.getElementById('iconFou').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="w-50"/>`;
    document.getElementById('tempFou').innerHTML = `${temp}°`;
    document.getElementById('humidFou').innerHTML = `Humidity: ${humid}`;
}
function dayFivShow(timeFiv, icon, temp, humid) {
    document.getElementById('dayFiv').innerHTML = `${timeFiv}`;;
    document.getElementById('iconFiv').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="w-50"/>`;
    document.getElementById('tempFiv').innerHTML = `${temp}°`;
    document.getElementById('humidFiv').innerHTML = `Humidity: ${humid}`;
}

function localStorageList(){
    document.querySelector('#cityStorage').innerHTML = "";
    for(i=0; i<cities.length; i++){
      document.querySelector('#cityStorage').innerHTML += `<li class="list-group-item">${cities[i]}</li>`;
      console.log(`${cities[i]}`)
    }
    localStorage.setItem("cityStorage", JSON.stringify(cities));    
}
