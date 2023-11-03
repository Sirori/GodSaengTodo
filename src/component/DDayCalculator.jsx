import  { useState, useEffect } from 'react';

function DDayCalculator() {
  const [date, setDate] = useState('');
  const [dDay, setDDay] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
    const day = String(now.getDate()).padStart(2, '0');

    setToday(`${year}년${month}월${day}일 입니다`);
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);

    const now = new Date();
    const dDayDate = new Date(e.target.value);
    const diffTime = Math.abs(dDayDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDDay(diffDays);
  };

  return (
    <div className='bg-[#aaaaaa] text-center  w-2/3 ml-4 p-4 rounded-2xl relative mt-3'>
      <p> 오늘은 {today}</p>
      <input type="date" value={date} onChange={handleDateChange} />
      <p> 남은 D-Day: {dDay}</p>
    </div>
  );
}

export default DDayCalculator;
