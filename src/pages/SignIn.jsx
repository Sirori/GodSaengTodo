import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function SignIn() {
	return (
		<>
			<Helmet>
				<title>GodSaengTodo -SignIn</title>
			</Helmet>
			<div className="signInWrapper w-full h-screen pt-[35%] flex flex-col font-pre">
				<h2 className="welcome w-full font-bold text-4xl text-center mb-[30%] font-baloo">
					Welcome to GodSaeng !
				</h2>
				<div className="loginBox w-[85%] mx-auto flex flex-col text-center gap-12">
					<h1 className="loginTitle font-semibold text-2xl">로그인</h1>
					<div className="inputWrapper">
						<form action="" className="flex flex-col gap-6">
							<legend className="sr-only">로그인 폼</legend>
							<div className="idInput flex flex-row justify-evenly items-center">
								<label className="font-bold text-lg w-[20%]" htmlFor="userId">
									아이디
								</label>
								<input
									type="text"
									name="userId"
									id="userId"
									placeholder="아이디를 입력해주세요"
									minLength={6}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-[70%] pl-5 py-2"
								/>
							</div>
							<div className="pwInput flex flex-row justify-evenly items-center mb-[10%]">
								<label className="font-bold text-lg w-[20%]" htmlFor="userPw">
									비밀번호
								</label>
								<input
									type="password"
									name="userPw"
									id="userPw"
									placeholder="비밀번호를 입력해주세요"
									minLength={8}
									required
									className="bg-gray-300 bg-opacity-50 rounded-full w-[70%] pl-5 py-2"
								/>
							</div>
							<button
								className="w-full h-14 bg-sky-200 rounded-2xl text-2xl text-white"
								type="submit"
							>
								로그인
							</button>
						</form>
					</div>
					<p>
						아이디가 없으신가요 ?
						<Link to={`/signup`} className="text-blue-400">
							회원가입
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default SignIn;
