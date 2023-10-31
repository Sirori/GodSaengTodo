import WeatherButton from '@/component/button/WeatherButton';
import Spinner from '@/component/layout/Spinner';
import { Helmet } from 'react-helmet-async';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import Calender from '@/component/Calender';



function Main() {
  
  const {bg, isLoading} = useBackgroundImage();

  if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={200} />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>GodSaengTodo -Main</title>
      </Helmet>
      
      
      <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
          >
          <WeatherButton/>
          </div>
    </>
  );
}

export default Main;
