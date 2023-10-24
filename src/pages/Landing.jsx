
import { Helmet } from 'react-helmet-async';
import LandingButton from '@/component/button/LandingButton';
// import { ReactComponent as Img } from "@/assets/img.svg";
import Img from '@/assets/img.svg'
function Landing() {
  return (
    <>
      <Helmet>
        <title>GodSaengTodo -Landing</title>
      </Helmet>
        <div className="w-full flex flex-col text-center gap-12 pt-44">
          <span className='block'>시연님 글씨 스타일 받아오기</span>
          <img src={Img} alt="Landing Logo"/>
          {/* <Img/>  안됨  */}
          <LandingButton/>
        </div>
  
    </>
  );
}

export default Landing;
