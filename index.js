
//Dom element select
  const button = document.querySelector(".btn");
  const input = document.querySelector(".city");
  const dates = document.querySelector(".dates");
  const temp = document.querySelector(".temp");
  const wind = document.querySelector(".wind");
  const humid = document.querySelector(".humid");
  const weatherpic = document.querySelector(".image");
  const climates = document.querySelector(".climate")
  const box2 = document.querySelectorAll(".box");
  const temp2 = document.querySelectorAll(".temp2");
  const wind2 = document.querySelectorAll(".wind2");
  const humid2 = document.querySelectorAll(".humid2");
  const weatherpic2 = document.querySelectorAll(".image2");
  const current = document.querySelector('.current')

//conf api
const url = 'https://api.openweathermap.org/data/2.5/weather?q='
  const api = '0cca22471928177ee7116371377c9249'
  

  // Function to fetch weather data from the API
  async function weatheraapi(citys) {
    
    const respone = await fetch ( url + citys+`&appid=${api}`);
    const data = await respone.json();

  // Get current date
  const time = new Date()
  const year = time.getFullYear();
  const month = time.getMonth()+1;
  const date = time.getDate();

  // Update  current weather data
    dates.innerHTML =`${data.name} (${year}/-${month}-${date})`
    temp.innerHTML="Temperature:  " + Math.round((data.main.temp)%33) +"°C";
    humid.innerHTML= "Humidity: " + data.main.humidity +"%";
    wind.innerHTML="Wind: " + data.wind.speed +"M/S";
  
   // Update weather icon and description
    let weatherico = data.weather[0].icon;
    weatherpic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherico + "@2x.png");
       
   switch (weatherico) {
    case "50d":
      climates.innerHTML="Mist"
      break;
   case "13d":
           climates.innerHTML="Snow"
   break;
   case "11d":
         climates.innerHTML="Thunderstrom"
         break;
   case "10d":
      climates.innerHTML="Rain"
      break;
   case "09d":
           climates.innerHTML="Shower rain"
   break;
   case "04d":
         climates.innerHTML="Broken clouds"
         break;
   case "03d":
      climates.innerHTML="scattered clouds"

      break;
   case "02d":
           climates.innerHTML="Few clouds"
   break;
   case "01d":
         climates.innerHTML="Clear sky"
         break;
    default:
      climates.innerHTML="Clear sky"
      break;
   }

  }

 weatheraapi('delhi')  //default city
// Event listener for the city search button
button.addEventListener("click", function(){
  weatheraapi(input.value);
})


// Function to update the 5-day forecast
for (let i = 0; i < 5; i++) {
const url2 = 'https://api.openweathermap.org/data/2.5/forecast?q='
 
async function weatherurl(citys2) {
  const respone2 = await fetch ( url2 + citys2+`&appid=${api}`);
  const datas = await respone2.json();

   const val = i * 8 + 6// Get data for the correct time interval
  const time2 = new Date(datas.list[val].dt*1000)
   const  year2 = time2.getFullYear();
   const month2 = time2.getMonth() + 1;
   const date2 = time2.getDate();

// Update UI with forecast data
box2[i].innerHTML =`(${year2}/-${month2}-${date2})`
temp2[i].innerHTML= "Temperature:  " + Math.round((datas.list[val].main.temp)-273.15) +"°C";  
humid2[i].innerHTML= "Humidity: " + datas.list[val].main.humidity +"%";
wind2[i].innerHTML= "Wind: " + datas.list[val].wind.speed +"M/S";

// Update weather icon
const weatherico2 = datas.list[val].weather[0].icon;
weatherpic2[i].setAttribute("src", "https://openweathermap.org/img/wn/" + weatherico2 + "@2x.png");

}

weatherurl('delhi')
button.addEventListener("click", function(){
  weatherurl(input.value);
})
}



// Function to get and display weather data based on current location
function getcurrent(){
  navigator.geolocation.getCurrentPosition(genereate ,error)

  function genereate(position){   
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
   
     async function cuur() {
      const response3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`);
      const data3 = await response3.json();
      weatheraapi(data3.name)
     }
    
     async function cuur2() {
     const response4 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`);
     const data4 = await response4.json();
     
     // Update the forecast with the current location

     for (let i = 0; i < 5; i++) {
         const val = i * 8 + 6;
         const time2 = new Date(data4.list[val].dt * 1000);
         
         const year2 = time2.getFullYear();
         const month2 = time2.getMonth() + 1;
         const date2 = time2.getDate();
         
         box2[i].innerHTML = `(${year2}/${month2}-${date2})`;
         temp2[i].innerHTML = "Temperature: " + Math.round(data4.list[val].main.temp - 273.15) + "°C"; 

         humid2[i].innerHTML = "Humidity: " + data4.list[val].main.humidity + "%";
         wind2[i].innerHTML = "Wind: " + data4.list[val].wind.speed + " m/s";
         
         const weatherico2 = data4.list[val].weather[0].icon;
         weatherpic2[i].setAttribute("src", "https://openweathermap.org/img/wn/" + weatherico2 + "@2x.png");

         
     }
 }
 current.addEventListener('click' , function(){
  cuur();
     cuur2();
 })
   
  }
  function error(error){
        console.log("error")
  }

  
}

getcurrent()


