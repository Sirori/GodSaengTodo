// import React from 'react'
import { useEffect, useState } from "react";
import pb from "@/api/pocketbase";
import { getRandom } from "@/utils/getRandom";
import { motion } from "framer-motion";

function WiseSaying() {
  const [wiseSayingEn, setWiseSayingEn] = useState(""); // 상태를 초기화합니다.
  const [wiseSayingKo, setWiseSayingKo] = useState(""); // 상태를 초기화합니다.
  const [wiseSayingPs, setWiseSayingPs] = useState(""); // 상태를 초기화합니다.
  const [dataCheck, setDataCheck] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (dataCheck) {
          return; // 이미 데이터를 가져온 경우, 요청을 건너뜁니다.
        }

        const resultList = await pb.collection("wiseSaying").getList(1, 50);
        const randomList = getRandom(resultList.totalItems);
        // console.log(resultList);
        // console.log(resultList.items[randomList].textKo);
        // console.log(randomList);
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
    <div>
     
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 10}}
        className=" font-pre text-center text-sm text-white mx-10 my-5"
      >
        <span className="flex flex-col gap-2">
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
          >
            {`"${wiseSayingKo}"`}
          </motion.span>
          {showDetails && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {wiseSayingEn}
            </motion.span>
          )}
          {showDetails && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10}}
              transition={{ duration: 0.4 }}
            >
              {wiseSayingPs}
            </motion.span>
          )}
        </span>
      </motion.div>
    </div>
  );
}

export default WiseSaying;