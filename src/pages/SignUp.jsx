import pb from "@/api/pocketbase";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormInput } from "../component/formInput/formInput";
import debounce from "@/utils/debounce";

function SignUp() {
	const navigate = useNavigate();
	const nameReg = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,8}$/;
	const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordReg = /^[a-zA-Z0-9]{8,16}$/;

	//@ 기본 Form
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	//@ 유효성 검사 상태
	const [validationErrors, setValidationErrors] = useState({
		name: false,
		email: false,
		password: false,
		passwordConfirm: false,
	});

	const handleRegister = async (e) => {
		e.preventDefault();

		const { password, passwordConfirm } = formState;

		if (password !== passwordConfirm) {
			alert("비밀번호가 일치하지 않습니다. 다시 확인해보세요.");
			return;
		}

		try {
			await pb
				.collection("users")
				.create({ ...formState, emailVisibility: true });

			alert("회원가입이 완료되었습니다. 가입된 정보로 로그인을 해주세요");
			navigate("/signin");
		} catch (error) {
			if (error.response.code === 400) {
				const { email } = error.response.data;

				if (email && email.message.includes("already")) {
					return alert("이미 등록된 이메일입니다.");
				}
			}
			console.error("서버 응답 에러:", error);
			alert("서버 응답 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
		}
	};

	const handleInput = (e) => {
		const { name, value } = e.target;

		let isValid;

		switch (name) {
			case "name":
				isValid = nameReg.test(value);
				break;
			case "email":
				isValid = emailReg.test(value);
				break;
			case "password":
				isValid = passwordReg.test(value);
				break;
			case "passwordConfirm":
				isValid = formState.password === value;
				break;
			default:
				return;
		}

		setValidationErrors({
			...validationErrors,
			[name]: !isValid,
		});

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleDebounceInput = debounce(handleInput, 500);

	return (
		<>
			<Helmet>
				<title>GodSaengTodo -SignUp</title>
			</Helmet>
			<div className="signInWrapper w-full h-screen pt-[30%] flex flex-col font-pre">
				<h2 className="welcome w-full font-bold text-4xl text-center mb-[15%] font-baloo">
					Welcome to GodSaeng !
				</h2>
				<div className="loginBox w-4/5 mx-auto flex flex-col text-center gap-12">
					<h1 className="loginTitle font-semibold text-2xl">회원가입</h1>
					<div className="inputWrapper">
						<form onSubmit={handleRegister} action="" className="flex flex-col">
							<legend className="sr-only">회원가입 폼</legend>
							<FormInput
								label="이메일"
								type="email"
								name="email"
								placeholder="이메일을 입력해주세요."
								minLength={8}
								defaultValue={formState.email}
								onChange={handleDebounceInput}
							/>
							{validationErrors.email ? (
								<span className="text-red-500 text-left text-sm mb-2">
									올바른 이메일 형식으로 입력해주세요.
								</span>
							) : (
								""
							)}
							<FormInput
								label="닉네임"
								name="name"
								placeholder="닉네임을 입력해주세요."
								minLength={2}
								defaultValue={formState.name}
								onChange={handleDebounceInput}
							/>
							{validationErrors.name ? (
								<span className="text-red-500 text-left text-sm mb-2">
									한글 또는 영문, 숫자 조합 2~8자리로 입력해주세요
								</span>
							) : (
								""
							)}
							<FormInput
								type="password"
								label="패스워드"
								name="password"
								placeholder="비밀번호를 입력해주세요."
								minLength={8}
								defaultValue={formState.password}
								onChange={handleDebounceInput}
								autoComplete="new-password"
							/>
							{validationErrors.password ? (
								<span className="text-red-500 text-left text-sm mb-2">
									비밀번호는 영문, 숫자를 포함하여 8~16자로 입력해주세요.
								</span>
							) : (
								""
							)}
							<FormInput
								type="password"
								label="패스워드 확인"
								name="passwordConfirm"
								placeholder="비밀번호를 한번 더 입력해주세요 :)"
								minLength={8}
								defaultValue={formState.passwordConfirm}
								onChange={handleDebounceInput}
								autoComplete="new-password"
							/>
							{validationErrors.passwordConfirm ? (
								<span className="text-red-500 text-left text-sm mb-2">
									비밀번호가 일치하지 않습니다.
								</span>
							) : (
								""
							)}
							<button
								className="w-full h-14 bg-sky-200 rounded-2xl text-2xl text-white mt-2"
								type="submit"
							>
								회원가입
							</button>
						</form>
					</div>
					<p>
						이미 계정이 있으신가요?
						<Link to={`/signin`} className="ml-2 text-blue-400">
							로그인
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default SignUp;
