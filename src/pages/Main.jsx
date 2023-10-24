import ImgComponent from "@/component/layout/ImgComponent";
import { Helmet } from "react-helmet-async";
import ToDo from "../components/ToDo";

function Main() {
  return (
    <div>
      <Helmet>
        <title>GodSaengTodo -Main</title>
      </Helmet>

      <ToDo />
      <ImgComponent />
    </div>
  );
}

export default Main;
