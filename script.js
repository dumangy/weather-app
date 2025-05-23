document.getElementById('searchButton').addEventListener('click', async () => {
    const location = document.getElementById('locationInput').value;

    if (!location) {
        alert('Введите название места.');
        return;
    }

    try {
        const apiKey = 'adbac17f54a6c9643b5a46d647e4db7e';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&lang=ru&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Место не найдено.');
        }

        const weatherData = await response.json();

        const weatherOutput = document.getElementById('forecastText');
        weatherOutput.textContent = `Температура: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;

        const clothingAdvice = document.getElementById('adviceText');
        const temp = weatherData.main.temp;
        const weatherCondition = weatherData.weather[0].main.toLowerCase();

        let advice = '';

        if (temp > 25) {
            advice = 'На улице жарко. Наденьте легкую одежду.';
        } else if (temp > 15) {
            advice = 'Тепло. Подойдет футболка и ветровка.';
        } else if (temp > 5) {
            advice = 'Прохладно. Наденьте теплую куртку.';
        } else {
            advice = 'Холодно. Наденьте зимнюю одежду.';
        }

        if (weatherCondition.includes('rain')) {
            advice += ' Не забудьте взять зонт, так как идет дождь.';
        } else if (weatherCondition.includes('snow')) {
            advice += ' На улице снег. Наденьте теплую обувь и шапку.';
        } else if (weatherCondition.includes('clear')) {
            advice += ' Погода ясная. Наслаждайтесь днем!';
        } else if (weatherCondition.includes('clouds')) {
            advice += ' На улице облачно. Возможно, будет прохладно.';
        }

        clothingAdvice.textContent = advice;
    } catch (error) {
        alert(error.message);
    }
});