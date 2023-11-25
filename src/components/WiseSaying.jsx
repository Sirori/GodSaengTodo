// import React from 'react'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pb from "@/api/pocketbase";
import { getRandom } from "@/utils/getRandom";

function WiseSaying() {
  const [wiseSayingEn, setWiseSayingEn] = useState(""); // 상태를 초기화합니다.
  const [wiseSayingKo, setWiseSayingKo] = useState(""); // 상태를 초기화합니다.
  const [wiseSayingPs, setWiseSayingPs] = useState(""); // 상태를 초기화합니다.
  const [dataCheck, setDataCheck] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (dataCheck) {
          return; // 이미 데이터를 가져온 경우, 요청을 건너뜁니다.
        }

        const resultList = await pb.collection("wiseSaying").getList(1, 50);
        const randomList = getRandom(resultList.totalItems);
        console.log(resultList.items[randomList].textKo);
        console.log(randomList);
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
      {dataCheck && (
        <div
          className="flex flex-col font-pre text-center text-sm text-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* <span>{`"${wiseSayingKo}"`}</span>
          <span>{wiseSayingEn}</span>
          <span>{wiseSayingPs}</span> */}
          <span>{`"${wiseSayingKo}"`}</span>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col font-pre text-center text-sm text-white"
              >
                <motion.span>{wiseSayingEn}</motion.span>
                <motion.span>{wiseSayingPs}</motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default WiseSaying;
