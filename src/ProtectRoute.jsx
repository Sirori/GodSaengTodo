import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./component/layout/Spinner";
import useAuthStore from "@/hooks/useAuthStore";
import useStorage from "@/hooks/useStorage";

function ProtectRoute({ children }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { authState } = useAuthStore();
	const { storageData } = useStorage("pocketbase_auth");
	const [isLoading, setIsLoading] = useState(true);
	console.log(storageData);
	useEffect(() => {
		const checkAuthState = async () => {
			try {
				if (!storageData) {
					import.meta.env.MODE === "development";

					alert("로그인 된 사용자만 이용 가능한 페이지입니다.", {
						position: "top-center",
						icon: "🚨",
						ariaProps: {
							role: "alert",
							"aria-live": "polite",
						},
					});
					navigate("/");
				}

				setIsLoading(false);
			} catch (error) {
				console.error("인증 상태 확인 중 오류 발생:", error);
				setIsLoading(false);
			}
		};

		checkAuthState();
	}, [navigate, storageData]);

	if (isLoading) {
		return <Spinner />;
	}

	return children;
}

export default ProtectRoute;
