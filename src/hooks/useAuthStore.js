import { create } from "zustand";
import pb from "@/api/pocketbase";

// 초기 인증 상태 정의
export const initialAuthState = {
	isAuth: false, // 로그인 여부
	user: null, // 사용자 정보
	token: "", // 인증 토큰
};

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
	authState: initialAuthState, // 초기 인증 상태

	initializeAuthState: () => {
		// 로컬 스토리지에서 인증 정보 불러오기
		const storedAuthData = localStorage.getItem("pocketbase_auth");
		if (storedAuthData) {
			const parsedData = JSON.parse(storedAuthData);
			set({ authState: parsedData });
		} else {
			set({ authState: initialAuthState });
		}
	},
	// 사용자 로그인 함수
	signIn: async (id, password) => {
		try {
			// 사용자 로그인 요청을 보내고 응답 받기
			const response = await pb
				.collection("users")
				.authWithPassword(id, password);
			const isAuth = !!response;

			// Zustand 상태를 업데이트하여 사용자 정보 저장
			set({
				authState: {
					isAuth: isAuth,
					user: isAuth ? response.record : null,
					token: isAuth ? response.token : "",
				},
			});

			// 로그인이 성공하면 응답 반환
			return response;
		} catch (error) {
			// 로그인 중 오류 발생 시 처리
			console.error("로그인 중 오류 발생:", error);

			// Zustand 상태를 업데이트하여 인증 정보 초기화
			set({
				authState: initialAuthState,
			});

			// 오류 시 빈 응답 반환
			return { isAuth: false, user: null, token: "" };
		}
	},

	// 사용자 로그아웃 함수
	signOut: async () => {
		// Zustand 상태를 업데이트하여 인증 정보 초기화
		set({
			authState: initialAuthState,
		});

		return await pb.authStore.clear();
	},

	// 회원 탈퇴 함수
	cancelMembership: async (recordId) => {
		set({
			authState: initialAuthState,
		});

		// 해당 사용자 레코드 삭제
		return await pb.collection("users").delete(recordId);
	},
}));

export default useAuthStore;
