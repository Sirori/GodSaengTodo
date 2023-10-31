import { useQuery } from "@tanstack/react-query";

function useGetWeather() {
  const callData = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=842d62f2255a3137540be4458157d9b9`)
          .then(response => response.json())
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      }, reject);
    });
  };

  const { isLoading, data, isError  } = useQuery(
    {
      queryKey: ['weatherdata'],
      queryFn : callData,
      retry : 2
    }
  )

  return { isLoading, data, isError  };
}

export default useGetWeather;
