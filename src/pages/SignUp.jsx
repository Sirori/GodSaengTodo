import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function SignUp() {
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
						<form action="" className="flex flex-col gap-6">
							<legend className="sr-only">회원가입 폼</legend>
							<div className="idInput flex flex-row justify-evenly items-center">
								<label className="sr-only" htmlFor="userId">
									아이디
								</label>
								<input
									type="text"
									name="userId"
									id="userId"
									placeholder="사용하실 아이디를 입력해주세요."
									minLength={6}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-full pl-6 py-3"
								/>
							</div>
							<div className="pwInput flex flex-row justify-evenly items-center">
								<label className="sr-only" htmlFor="userNickName">
									닉네임
								</label>
								<input
									type="text"
									name="userNickName"
									id="userNickName"
									placeholder="사용하실 닉네임을 입력해주세요."
									minLength={8}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-full pl-6 py-3"
								/>
							</div>
							<div className="pwInput flex flex-row justify-evenly items-center">
								<label className="sr-only" htmlFor="userPw">
									비밀번호
								</label>
								<input
									type="password"
									name="userPw"
									id="userPw"
									placeholder="사용하실 비밀번호를 입력해주세요."
									minLength={8}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-full pl-6 py-3"
								/>
							</div>
							<div className="pwInput flex flex-row justify-evenly items-center mb-[5%]">
								<label className="sr-only" htmlFor="userPwCheck">
									비밀번호 확인
								</label>
								<input
									type="password"
									name="userPwCheck"
									id="userPwCheck"
									placeholder="비밀번호를 한 번 더 입력해주세요 :D"
									minLength={8}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-full pl-6 py-3"
								/>
							</div>
							<button
								className="w-full h-14 bg-sky-200 rounded-2xl text-2xl text-white"
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
