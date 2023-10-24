navigator.geolocation.getCurrentPosition(data=>{
  const {latitude, longitude} = data.coords;
  // console.log(latitude,longitude)

  const callData = async ()=>{
     await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=842d62f2255a3137540be4458157d9b9`).then(response => response.json()).then(data => {
      console.log(data);
    })
  }
  callData();
})