class WeatherComponent extends HTMLElement {
    connectedCallback() {
        this.getDataFromAPI('Cuenca');
    }

    async getDataFromAPI(city) {
        const apiKey = '4c90ac39c4e88b4e89ea46a4cdabdf40';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    displayWeather(data) {
        // Cambia los colores del gradiente en la clase .weather-card
        const backgroundColor = getBackgroundColor(data.weather[0].main);

        // Muestra los datos en una tarjeta informativa
        this.innerHTML = `
            <style>
                .weather-card {
                    background: ${backgroundColor};
                    border-radius: 10px;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                    transition: transform .2s, opacity .2s;
                    opacity: 0.9;
                }
                .weather-card:hover {
                    transform: scale(1.1);
                    opacity: 1;
                }
            </style>
            <div class="weather-card">
                <h2>${data.name}</h2>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Descripción: ${data.weather[0].description}</p>
            </div>
        `;
    }
}

customElements.define('weather-component', WeatherComponent);

//Obtener un color de fondo basado en el estado del tiempo
function getBackgroundColor(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return 'linear-gradient(to right, #56CCF2, #2F80ED)';
        case 'clouds':
            return 'linear-gradient(to right, #4CA1AF, #C4E0E5)';
        case 'rain':
            return 'linear-gradient(to right, #667db6, #0082c8)';
        case 'thunderstorm':
            return 'linear-gradient(to right, #141e30, #243b55)';
        case 'snow':
            return 'linear-gradient(to right, #83a4d4, #b6fbff)';
        default:
            return 'linear-gradient(to right, #1e3c72, #2a5298)';
    }
}
