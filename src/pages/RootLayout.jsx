import { Outlet } from "react-router-dom";




function RootLayout() {
  return (  
    <div className="max-w-[430px]">
      <Outlet/>
    </div>
  );
}

export default RootLayout;
