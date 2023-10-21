function getWeather() {
    const apiKey = 'd2952b129b1b3eb8d7e04e3a7744ef64';
    const locationInput = document.getElementById('location').value.trim(); // Trim removes leading/trailing spaces
    const locationName = document.getElementById('location-name');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    // Check if the user has exceeded the daily search limit (2 searches)
    const searchesToday = localStorage.getItem('searchesToday') || 0;

    if (searchesToday >= 2) {
        alert('You have exceeded the daily search limit.');
        return;
    }

    if (locationInput === '') {
        alert('Please enter a location before getting the weather.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            locationName.textContent = `📍 Location: ${data.name}, ${data.sys.country}`;
            temperature.textContent = `🌡️ Temperature: ${data.main.temp}°C`;
            conditions.textContent = `🌧️ Conditions: ${data.weather[0].description}`;
            humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

            // Update the search count for today
            localStorage.setItem('searchesToday', searchesToday + 1);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            locationName.textContent = '🚫 Location not found';
            temperature.textContent = '';
            conditions.textContent = '';
            humidity.textContent = '';
            windSpeed.textContent = '';
        });
}

