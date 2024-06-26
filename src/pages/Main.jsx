import WeatherButton from "@/component/button/WeatherButton";
import Spinner from "@/component/layout/Spinner";
import { Helmet } from "react-helmet-async";
import useBackgroundImage from "@/hooks/useBackgroundImage";
import Calender from "@/component/Calender";
import ToDo from "@/components/ToDo";
import WiseSaying from "@/components/WiseSaying";
import DdayButton from "@/component/button/DdayButton";

function Main() {
	const { bg, isLoading } = useBackgroundImage();

	if (isLoading) {
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
        className="relative"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <WeatherButton />
        <ToDo />
        <WiseSaying/>
        <Calender/>
        <DdayButton/>
      </div>
    </>
  );
}

export default Main;