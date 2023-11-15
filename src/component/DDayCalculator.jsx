import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DDayCalculator({onClose}) {
  const [date, setDate] = useState('');
  const [task, setTask] = useState(''); 
  const [dDay, setDDay] = useState('');
  const [today, setToday] = useState('');
  const [taskList, setTaskList] = useState([]);  // 할 일 저장할 usestate

  useEffect(() => {
    const savedTaskList = localStorage.getItem('taskList');
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()+1).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    setToday(today);
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('taskList');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    const now = new Date();
    const dDayDate = new Date(e.target.value);
    const diffTime = Math.abs(dDayDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDDay(diffDays);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const registerTask = () => {
    const newTaskList = [...taskList, { task, date, dDay }];
    setTaskList(newTaskList);
    localStorage.setItem('taskList', JSON.stringify(newTaskList));
    setTask('');
    setDate('');
    setDDay('');
  };

  return (
    <div className='bg-[#aaaaaa] text-center w-[300px] ml-4 p-4 rounded-2xl absolute mt-3'>
      <button onClick={onClose} className="absolute right-[15px] top-2">x</button>
      <input type="text"
        className='mb-2' 
        placeholder='무슨 일을 하실 예정인가요?'
        value={task}
        onChange={handleTaskChange}
      />
      <input type="date" min={today} onChange={handleDateChange} />
      <div className='p-2'>
        <button onClick={registerTask} className='border border-cyan-700 rounded-lg p-1'>등록하기</button>
      </div>
      {taskList.map((item, index) => (
        <div className='border rounded-lg bg-white mt-2' key={index}>
          <div className='flex justify-between px-3 pt-1 border-b border-black'>
            <p>{item.date}</p>
            <p>D-day: {item.dDay}</p>
          </div>
          <p>{item.task}</p>
        </div>
      ))}
    </div>
  );
}

DDayCalculator.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DDayCalculator;
