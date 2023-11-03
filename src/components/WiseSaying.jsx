// import React from 'react'
import React, { useEffect, useState } from "react";
import pb from "@/api/pocketbase";
import { getRandom } from "@/utils/getRandom";

function WiseSaying() {
  // const getItem = async (e) => {
  //   e.preventDefault();

  //   // PocketBase SDK 인증 요청
  //   try {
  //     // if (isLoginEmailValid !== true || isLoginPasswordValid !== true) {
  //     //   toast.error('아이디 또는 비밀번호를 형식에 맞게 입력해주세요');
  //     //   return;
  //     // }

  //     const resultList = await pb.collection("wiseSaying").getList(1, 50);

  //     if (resultList) {
  //       console.log(resultList);

  //       // const record = await pb.collection('users').getOne(authData.record.id);
  //       // const url = getPbImageURL(record, 'profile');
  //       // setURL(url);

  //       // handleLoginReset();

  //       // navigate('/');
  //     }
  //   } catch (error) {
  //     console.log("오류", error.response);
  //   }
  // };

  const [wiseSayingEn, setWiseSayingEn] = useState(""); // 상태를 초기화합니다.
  const [wiseSayingKo, setWiseSayingKo] = useState(""); // 상태를 초기화합니다.
  const [wiseSayingPs, setWiseSayingPs] = useState(""); // 상태를 초기화합니다.
  const [dataCheck, setDataCheck] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {

        if (dataCheck) {
          return; // 이미 데이터를 가져온 경우, 요청을 건너뜁니다.
        }

        const resultList = await pb.collection("wiseSaying").getList(1, 50);
        const randomList = getRandom(resultList.totalItems);
        console.log(resultList.items[randomList].textKo);
        console.log(randomList)
        setWiseSayingKo(resultList.items[randomList].textKo); // 상태를 업데이트합니다.
        setWiseSayingEn(resultList.items[randomList].textEn); // 상태를 업데이트합니다.
        setWiseSayingPs(resultList.items[randomList].personality); // 상태를 업데이트합니다.

        setDataCheck(true);
      } catch (error) {
        console.log("오류", error.response);
      }
    };

    getItem();
  }, []);
  return (
    // <div>
    //   {dataCheck ? (
    //     <div className="flex flex-col font-pre text-center text-sm text-white">
    //       <span>{`"${wiseSayingKo}"`}</span>
    //       <span>{wiseSayingEn}</span>
    //       <span>{wiseSayingPs}</span>
    //     </div>
    //   ) : (
    //     ""
    //   )}
    // </div>
    <div>
      {dataCheck && (
        <div className="flex flex-col font-pre text-center text-sm text-white">
          <span>{`"${wiseSayingKo}"`}</span>
          <span>{wiseSayingEn}</span>
          <span>{wiseSayingPs}</span>
        </div>
      )}
    </div>
  );
}

export default WiseSaying;
