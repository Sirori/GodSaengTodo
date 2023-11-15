import { useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';




function Calender() {
	const [value, onChange] = useState(new Date());

	return (
		<div className="px-10 pt-2">
			<Calendar 
			onChange={onChange} 
			formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
			value={value} />
		</div>
	);
}

export default Calender;
