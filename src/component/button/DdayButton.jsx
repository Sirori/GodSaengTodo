import { useState } from "react";
import DDayCalculator from "../DDayCalculator";

function DdayButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={()=>setIsModalOpen(true)}>d-day 계산기</button>
      {isModalOpen && <DDayCalculator onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}



export default DdayButton;
