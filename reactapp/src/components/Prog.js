
import Calendario from '../pagine/Calendario';
import React, {useState,useLayoutEffect} from 'react'; 
import Below from './Below';
import  Giorno1 from "./Giorno1";


function Prog (){
 


  const[date,setDate]=useState(new Date());
  const onChangeDate=date=> {

    setDate(date);
 
    
}  


  
    return(
       <div className="prog">
        <h1 className="cinema-h1"> PROGRAMMAZIONE FILM </h1>
    
     
      <div className="calendario">

       <Calendario  data={date} onChangeDate={onChangeDate} />: 
   
      </div>
      <Giorno1  key={date} date={date}/>
       <Below/>
      </div>
  
        
  );
  

}

export default Prog; 