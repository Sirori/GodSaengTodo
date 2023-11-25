import { Helmet } from "react-helmet-async";
import LandingButton from "@/component/button/LandingButton";
// import { ReactComponent as Img } from "@/assets/img.svg";
import Img from "@/assets/img.svg";
function Landing() {
  return (
    <>
      <Helmet>
        <title>GodSaengTodo -Landing</title>
      </Helmet>
      <div className="w-full flex flex-col text-center gap-12 pt-44">
        <h2 className="welcome w-full font-bold text-4xl text-center font-baloo">
          Welcome to GodSaeng !
        </h2>
        <img src={Img} alt="Landing Logo" />
        <LandingButton />
      </div>
    </>
  );
}

export default Landing;
