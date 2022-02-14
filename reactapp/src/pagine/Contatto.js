import React from 'react';


function Contatto(props)
{
     return(
    <div className={""} >
     <ul>
    <li>  <img src={props.src}  style={props.stylei} /> </li> 
    <li>    {props.media}     </li> 
    
    <li>   {props.contenuto}   </li> 
    
    </ul>
        
    </div>
 )
     }


 export default Contatto;