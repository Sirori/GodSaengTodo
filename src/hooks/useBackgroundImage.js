import pb from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function callImgData(){
  const response = await pb.collection("background").getFullList({});
  return response;
}

function useBackgroundImage() {
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

  
  return {bg, isLoading};
}

export default useBackgroundImage;
