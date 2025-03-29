const buttonSend = document.querySelector(".btnSend")
const form = document.querySelector(".form-container")
const inputCity = document.querySelector(".inputCity")
const weatherInformationContainer = document.querySelector(".weatherInformationContainer")
const errorMessage = document.querySelector(".errorMessage")

let obj = {}

form.addEventListener("submit",function(e){
    e.preventDefault()
    errorMessage.textContent = ""
    
    if (inputCity.value.trim() === "") {
        weatherInformationContainer.innerHTML = "";
        alert("Please enter a city");
        return;
    }
    
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=9383a18bdf2adb40e4b2fd5e77b5bfe6&units=metric`)
    .then(response => response.json())
    .then(data => {
        
        if (String(data.cod) !== "200") {
            throw data.message || "City not found";
        }
    
        const weatherHtml = `
                <h2>🌡️ Weather Information</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Min Temp:</strong> ${data.main.temp_min}°C</p>
                <p><strong>Max Temp:</strong> ${data.main.temp_max}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                <p><strong>Clouds:</strong> ${data.clouds?.all ?? "No data"}</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `

        weatherInformationContainer.innerHTML = weatherHtml
        inputCity.value = ""

    })
    .catch(error =>{
        errorMessage.textContent = `⚠️ ${error}`
        errorMessage.style.color = "red"
        errorMessage.style.marginTop = "10px"
        weatherInformationContainer.innerHTML = ""
        inputCity.value = ""
    })
})