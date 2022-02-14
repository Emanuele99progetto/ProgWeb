import React from 'react';


function Foto(props)
{
     return(

     <div className="img-box1">
   
      <img src={props.src}  style={props.stylei} className="foto-img1"/>

       <div className="foto-desc">
    <h2>    {props.description}  </h2> 
    </div>
    </div>
 
  
 )
     }


 export default Foto;