
import React,{useState,useEffect} from 'react';
import {faHandPointRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";


function Beginner() {

  const [showElement,setShowElement] = useState(false)
  useEffect(()=>{
    setTimeout(function() {
      setShowElement(true)
         }, 3500);
       },
   [])
      

  return (<div className="start">
    <div className="begin">
         <div className="begin-title">
          <h1 > CINEREACT</h1>
          </div>
          </div>
          <div className="begin-text1">
      <h2>IL PIU GRANDE CINEMA DELLA REGIONE</h2>
      </div>
      <div className="begin-text2">
           <h3>Con ben 30 SALE SCHERMI e più di 10000 metri quadrati di grandezza risultiamo
             essere il più grande cinema della Regione Marche. </h3>
        </div>
        {showElement? <div className="buttons">  
      <Link to="/registrazione">
 
    <button className="button-reg">
    <FontAwesomeIcon icon={faHandPointRight} className="fontawe-beg"/> 
     REGISTRATI</button>
      </Link>

      <Link to="/login">
    
    <button className="button-reg">
    <FontAwesomeIcon icon={faHandPointRight} className="fontawe-beg"/> 
     AUTENTICATI</button>
      </Link>
      </div>:<></>} 

      
   
    </div>
  );
}
 
export default Beginner;