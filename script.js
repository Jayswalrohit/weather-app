function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        document.getElementById('result').innerHTML = `<p style="color:red;">Please enter a location.</p>`;
        return;
    }
    
    const apiKey = 'a4412182223e4e9f822172049251603'; // Replace with your valid API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.current) {
                throw new Error("Invalid API response");
            }
            const temperature = data.current.temp_c;
            document.getElementById('result').innerHTML = `
                <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
            `;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
            console.error("Error:", error);
        });
}
