const container = document.getElementById('container');
const loading = document.getElementById('loading');
const hora = document.getElementById('hora');
const iconElement = document.getElementById('iconElement');
const max_min = document.getElementById('max_min');

const API_KEY = 'ffe8108b9ee0e9e7609237c7f0915455';

//data que recibe de su posicion
const dataDeLaPosicion = (position) => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    
}

const setWeatherData = (data) => {
    console.log(data);
    const weatherData = {
        localizacion: data.name,
        descripcion: data.weather[0].description,
        humedad: data.main.humidity,
        presion: data.main.pressure,
        temperatura: data.main.temp,
        wind: data.wind.speed,
        fecha: getDate(),
        hora: clock(),
        
        
    }

    const max = data.main.temp_max;
    const min = data.main.temp_min;
    max_min.innerHTML = `<p>Max:${max}° Min:${min}°`;

    const icon = data.weather[0].icon;
    iconElement.innerHTML = `<img src="icons/${icon}.png"></img>`;

    //iterar las keys de nuestro objeto
    //setearlas con la info que tiene cada key

    //el foreach recorre el objeto y nos devuelve las keys
    Object.keys(weatherData).forEach(key =>{
        document.getElementById(key).textContent = weatherData[key]
    });

    esperar();
    
}

const esperar = () => {
    loading.style.display='none';
    container.style.display='flex';
}

const getDate = () =>{
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(dataDeLaPosicion);
}

// HORA

const clock = () =>{
    setInterval(function(){
        let horario = new Date();
    
        let horas = horario.getHours();
        let minutos = horario.getMinutes();
        
    
        if(horas<10){
            horas = "0" + horas;
        }
        if(minutos<10){
            minutos = "0" + minutos;
        }
       
    
        hora.innerHTML = `${horas}:${minutos}`;

    },);
    
}
