import pb from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();
	const handleLogout = async (e) => {
		e.preventDefault();
		if (confirm("로그아웃하시겠습니까?")) {
			navigate("/");
			return await pb.authStore.clear();
		}
	};
	return (
		<button
			className="bg-[#A8CAFF] w-1/4 py-2 px-1 rounded-[15px] mt-2 mr-2 text-white text-sm absolute right-0 z-10"
			onClick={handleLogout}
		>
			로그아웃
		</button>
	);
}

export default LogoutButton;
