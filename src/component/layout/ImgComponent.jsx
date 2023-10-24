import pb from "@/api/pocketbase";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function callImgData(){
  const response = await pb.collection("background").getFullList({});
  return response;
}

function ImgComponent() {
  const [bg, setBg] = useState(null);
  const { isLoading, data } = useQuery(
    {
      queryKey: ['imgdata'],
      queryFn : callImgData,
      retry : 2
    }
  )

  useEffect(() => {
    if (data) {
      let allImages = [];
      let imgId = "";
      
      data.forEach((item) => {
        allImages = [...allImages, ...item.image];
        imgId = item.id;
      });

      setBg(
        `${import.meta.env.VITE_PB_API}/files/background/${imgId}/${
          allImages[~~(Math.random() * allImages.length)]
        }`
      );
    }
  }, [data]);

  if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={200} />
      </div>
    );
  }

  
  return (
    <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
     ></div>
     
   );
}

export default ImgComponent;
