import React,{useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendario({ data,onChangeDate})

{

   

     return(



    <div>
     <Calendar value={data} onChange={onChangeDate}  />
    </div>
 )
     }


    // render(<ReactCalendar/>,document.querySelector("#root"));

 export default Calendario;