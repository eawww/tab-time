import { useState, useEffect, useRef } from 'react';
import { Calendar } from 'calendar';

import logo from './logo.svg';
import './App.css';

const CAL = new Calendar();
console.log('monthymonth', CAL.monthDates(2012, 0));

const START_YEAR = 1970;

const years = [...Array(100)].map((val, index) => START_YEAR + index);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

console.log('years', years)

const Week = ({week}) => {
  return <div className='week'>
    {
      week.map(day => <button
        className="appointmentButton"
        onClick={() => alert('Appointment Scheduled')}
      >
        {`Schedule Appointment for ${day.toDateString()}`}
        
      </button>)
    }
  </div>
}

const MonthCalendar = ({year, month}) => {
  const cal = CAL.monthDates(year, months.indexOf(month));
  console.log(cal);

  const days = cal.reduce((acc, week) => acc.concat(week), [])
    .filter(date => date.getMonth() === months.indexOf(month));

  let stupidCalendar = []
  for (let i=0; i < days.length; i += 7) {
      stupidCalendar.push(days.slice(i, i + 7));
  }
  console.log('stupidCalendar', stupidCalendar);

  console.log('days', days);

  return <div>
    {
      stupidCalendar.map(week => <Week week={week}/>)
    }
  </div>
}

function App() {
  const [yearSelected, setYearSelected] = useState(false);
  const [monthSelected, setMonthSelected] = useState(false);

  const [selectedYear, setSelectedYear] = useState();
  const [yearLoading, setYearLoading] = useState(false);
  const yearTimeout = useRef();
  useEffect(() => {
    if(yearLoading){
      clearTimeout(yearTimeout.current);
      yearTimeout.current = setTimeout(() => setYearLoading(false), 4500);
    }
  }, [yearLoading])

  const [selectedMonth, setSelectedMonth] = useState();
  const [monthLoading, setMonthLoading] = useState(false);
  const monthTimeout = useRef();
  useEffect(() => {
    if(monthLoading){
      clearTimeout(yearTimeout.current);
      yearTimeout.current = setTimeout(() => setMonthLoading(false), 1200)
    }
  }, [monthLoading])

  return (
    <div className="App">
      <div className="tabContainer yearsContainer">
        <div className="tabOverflower">
          {
            years.map(year => 
              <button
                onClick={() => {
                  setSelectedYear(year);
                  setYearSelected(true)
                  setYearLoading(true);
                }}
                className={`tab ${year === selectedYear ? 'selected' : ''}`}
              >{year}</button>
            )
          }
        </div>
      </div>
      <div className="monthContainer">
        {
          !yearSelected? null :
          yearLoading ? 'Please wait for year.' :
          <div>
            <div className="tabContainer monthsContainer">
              <div className="tabOverflower">
                {
                  months.map(month => 
                    <button
                      onClick={() => {
                        setSelectedMonth(month);
                        setMonthSelected(true);
                        setMonthLoading(true);
                      }}
                      className={`tab ${month === selectedMonth ? 'selected' : ''}`}
                    >{month}</button>
                  )
                }
              </div>
            </div>
            {
              !monthSelected ? '' :
              monthLoading ? 'Please wait for month.' :
              <div>
                <MonthCalendar year={selectedYear} month={selectedMonth}/>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
