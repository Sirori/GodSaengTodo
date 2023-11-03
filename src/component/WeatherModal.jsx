import useGetWeather from "@/hooks/useGetWeather";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "./layout/Spinner";
import PropTypes from 'prop-types';

function WeatherModal({ onClose }) {
  const { isLoading, data} = useGetWeather();
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      let iconData = data.weather[0].icon.replace("n", "d");
      setIcon(`https://openweathermap.org/img/wn/${iconData}.png`);
    }
  }, [isLoading, data]);
  if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={200} />
      </div>
    );
  }
  return (
    <div className="bg-[#aaaaaa] text-white w-2/3 ml-4 p-4 rounded-2xl absolute z-50">
      <button onClick={onClose} className="absolute right-[15px] top-2">x</button>
      <div className="flex">
        <div className="flex flex-col">
          <span>{data.name}</span>
          <span>{data.weather[0].main}</span>          
        </div>
        <img src={icon} alt="" className="h-[50px] pl-3" />
        
      </div>
      <div className="flex justify-between">
        <span className="text-[35px] pt-2">{Math.round(data.main.temp - 273.15)}°</span>
        <div className="mr-10">
          <p>습도  {data.main.humidity}%</p>
          <p>체감온도 {(data.main.feels_like - 273.15).toFixed(1)}°</p>
          <p>풍속 {data.wind.speed}m/s</p>
        </div>
      </div>
    </div>
  );
}

WeatherModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default WeatherModal;

