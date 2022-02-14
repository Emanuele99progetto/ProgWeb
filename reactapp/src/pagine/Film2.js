

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Notify from '../Util/Notify'



function Film2({ idfilm, data, nome, casa_p, img, prezzo, ora, descr }) {

  
  const [notifica, setNotifica] = useState(0);

  const refreshPage = () => {
    setTimeout(() => {

      window.location.reload();
        
    }, 1500);
   
  
  }


  function Prenotazione() {
    setNotifica(0);
    const token=localStorage.getItem('token');
    const userStr = localStorage.getItem('email');
    const userStri = JSON.parse(userStr);
    const date = new Date(new Date(data).getTime() - (new Date(data).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

    axios.delete(` https://localhost:8080/pren`, {
      data: {
        idfilm: idfilm,
        email: userStri,
        ora: ora,
        data: date,
      }, 
       headers: {
        authorization: `qwe1234`+token,
      }
    

    }).then(
      (res) =>{
        if(res.data.success=="1")
      {setNotifica(1);
        refreshPage();}
      else{
        setNotifica(2);

      }}).catch(err=>{ setNotifica(2);});
    }



  return (

    <div className="pren-cont">
      <div className="pren-in">
        <img src={require('../images/' + img).default} alt={idfilm} />
      </div>
      <div className="pren-end">
        <h3>TITOLO: {nome}</h3>
        <h3>CASA PRODUTTRICE: {casa_p}</h3>
        <h3>DESCRIZIONE DEL FILM: {descr}</h3>
        <h3>PREZZO: {prezzo} € </h3>
        <h3>DATA:  {new Date(new Date(data).getTime() - (new Date(data).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)}</h3>
        <h3>ORARIO: {ora}</h3>
        <br></br>
        <br></br>
        <h3 style={{ textAlign: "center" }}> RIMUOVI PRENOTAZIONE: </h3>
        <button className="button-min" onClick={Prenotazione}>
          <h2><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></h2>
        </button>
        {notifica==1 &&
      <Notify desc="PRENOTAZIONE ELIMINATA CON SUCCESSO" which={0} time={1000}/>
          }
           {notifica==2 &&
      <Notify desc="QUALCOSA E' ANDATO STORTO" which={1} />
          }

      </div>
     
    </div>

  );


}

export default Film2; // per esportare questo componente (diciamo classe...)