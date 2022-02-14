import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare,faInstagramSquare,faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import React from 'react';


function Below (){


    return(
 <div className="home-bottom">
 <h4>ABOUT US</h4>
 <p>L'azienda è stata creata nel mese di luglio del 2021 dalla collaborazione dei 
   cugini Emanuele Domizi e Pierpaolo Domizi
 </p>

 <FontAwesomeIcon className="home-fa" icon={faFacebookSquare} onClick={(e) => {
      e.preventDefault();
      window.location.href='https://facebook.com';
      }} />
 <FontAwesomeIcon className="home-fa"  icon={faInstagramSquare}  onClick={(e) => {
      e.preventDefault();
      window.location.href='https://www.instagram.com/';
      }}/>
 <FontAwesomeIcon className="home-fa"  icon={faTwitterSquare}  onClick={(e) => {
      e.preventDefault();
      window.location.href='https://twitter.com';
      }}/>

 

 </div> );
}


export default Below; 