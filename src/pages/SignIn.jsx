import { Helmet } from "react-helmet-async";
import pb from "@/api/pocketbase";
import debounce from "@/utils/debounce";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


function SignIn() {
	const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordReg = /^[a-zA-Z0-9]{8,16}$/;
	const { state } = useLocation();
	const navigate = useNavigate();
	
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});
	const [loginValidation, setloginValidation] = useState({
		id: false,
		password: false,
	});

	const handleSignIn = async (e) => {
		e.preventDefault();

		const { email, password } = formState;

		try {
			const response = await pb
				.collection("users")
				.authWithPassword(email, password);

			// console.log(response);
			// console.log(response.model.id)

			if (!state) {
				navigate("/main");
			} else {
				const { wishLocationPath } = state;
				navigate(wishLocationPath === "/signin" ? "/main" : wishLocationPath);
			}
		} catch (error) {
			console.error("서버 응답 에러:", error);
			if (error.response && error.response.code === 400) {
				alert("등록되지 않은 이메일이거나 비밀번호가 틀렸습니다.");
			} else {
				alert("서버 응답 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const handleInput = debounce((e) => {
		const { name, value } = e.target;

		let isValid;

		switch (name) {
			case "email":
				isValid = emailReg.test(value);
				break;
			case "password":
				isValid = passwordReg.test(value);
				break;
			default:
				return;
		}

		setloginValidation({
			...loginValidation,
			[name]: !isValid,
		});
		if (isValid) {
			setFormState({
				...formState,
				[name]: value,
			});
		}
	}, 400);

	return (
		<>
			<Helmet>
				<title>GodSaengTodo -SignIn</title>
			</Helmet>
			<div className="signInWrapper w-full h-screen pt-[35%] flex flex-col font-pre">
				<h2 className="welcome w-full font-bold text-4xl text-center mb-[25%] font-baloo">
					Welcome to GodSaeng !
				</h2>
				<div className="loginBox w-[85%] mx-auto flex flex-col text-center gap-12">
					<h1 className="loginTitle font-semibold text-2xl">로그인</h1>
					<div className="inputWrapper">
						<form onSubmit={handleSignIn} className="flex flex-col gap-2">
							<legend className="sr-only">로그인 폼</legend>
							<div className="idInput flex flex-row justify-evenly items-center">
								<label className="font-bold text-lg w-[20%]" htmlFor="email">
									이메일
								</label>
								<input
									label="이메일"
									type="text"
									name="email"
									id="email"
									placeholder="이메일을 입력해주세요."
									minLength={8}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-[70%] pl-5 py-2"
									onChange={handleInput}
									autoComplete="email"
								/>
							</div>
							{loginValidation.email && (
								<span className="text-red-500 ml-[10%] text-sm">
									올바른 이메일 형식을 입력하세요.
								</span>
							)}
							<div className="pwInput flex flex-row justify-evenly items-center mt-3">
								<label className="font-bold text-lg w-[20%]" htmlFor="password">
									비밀번호
								</label>
								<input
									label="비밀번호"
									type="password"
									name="password"
									id="password"
									placeholder="비밀번호를 입력해주세요."
									minLength={8}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-[70%] pl-5 py-2"
									onChange={handleInput}
									autoComplete="current-password"
								/>
							</div>
							{loginValidation.password && (
								<span className="text-red-500 ml-[10%] text-sm">
									올바른 비밀번호 형식이 아닙니다.
								</span>
							)}
							<button
								className="w-full h-14 bg-sky-200 rounded-2xl text-2xl text-white mt-8"
								type="submit"
							>
								로그인
							</button>
						</form>
					</div>
					<p>
						아이디가 없으신가요 ?
						<Link to={`/signup`} className="text-blue-400 ml-2">
							회원가입
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default SignIn;
