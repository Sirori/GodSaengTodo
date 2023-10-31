import useGetWeather from "@/hooks/useGetWeather";
import { useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import WeatherModal from "../WeatherModal";

function WeatherButton() {
  
  const [icon, setIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line
  const {isLoading, data, isError} = useGetWeather();

  useEffect(() => {
    if(!isLoading && data){
      let iconData = data.weather[0].icon.replace('n','d');
      setIcon(`https://openweathermap.org/img/wn/${iconData}.png`);
    }
  }, [isLoading, data]);
  
  if(isError){
    return(
      <div className="p-4">
        사용자의 위치를 불러오지 못하였습니다.
      </div>
    )
  }else if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={200} />
      </div>
    );
  }
  else if(!isLoading && data){
    return (
      <>
        <button onClick={() => setIsModalOpen(true)} className="ml-4">
          <span>현재 {data.name}의 날씨 {Math.round(data.main.temp - 273.15)}° - {data.weather[0].main}</span>
          <img src={icon} alt="" className="inline"/>
        </button>
        {isModalOpen && <WeatherModal onClose={() => setIsModalOpen(false)} />}
      </>
    )
  }

}

export default WeatherButton;
