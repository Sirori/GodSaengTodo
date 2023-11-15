import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import ProtectRoute from "./ProtectRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <Landing />,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/main",
				element: (
					<ProtectRoute>
						<Main />
					</ProtectRoute>
				),
			},
		],
	},
]);

export default router;
