import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LandingButton() {

  const navigate = useNavigate();
  return (
    <Link 
    className="bg-[#A8CAFF] w-3/4 mx-auto p-3 rounded-[15px] text-white"
    onClick={()=>{
      navigate('/signin');
    }}
    >
    시작하기
    </Link>
  )
}

export default LandingButton;