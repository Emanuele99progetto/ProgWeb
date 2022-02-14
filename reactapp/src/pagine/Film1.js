

import React, {useState,useEffect} from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Soldout from '../cinema/soldout.png'
import Notify from '../Util/Notify'

function Film1 ({idfilm,data,nome,casa_p,img,prezzo,ora,descr,n_big}){
 
  const refreshPage = () => {
    setTimeout(() => {

      window.location.reload();
        
    }, 1500);
   
  
  }

  useEffect(()=>{ 

  const current = new Date();
  const current1 = new Date(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
  const date= new Date(new Date(data).getTime() - (new Date(data).getTimezoneOffset() * 60000));
    if(current.getTime()>date.getTime())
    {console.log("TEMPO SCADUTO");
    setShowResults(true);}
    if(current.getTime()<date.getTime())
    {
      console.log("ANCORA C'è TEMPO");}

     if(n_big<1)
    {setShowSoldout(true);
      setShowResults(true);}
  
  },[]);


  const [notifica, setNotifica] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showSoldout, setShowSoldout] = useState(false);

  function Prenotazione(){
    setNotifica(0);
    const token=localStorage.getItem('token');
    const userStr = localStorage.getItem('email');
    const userStri=JSON.parse(userStr);
    const date= new Date(new Date(data).getTime() - (new Date(data).getTimezoneOffset() * 60000)).toISOString().substr(0,10);
    axios.post(` https://localhost:8080/pren`,{
      email: userStri,
      idfilm: idfilm,
      ora: ora,
      data: date,
    
       
    }, { headers: {
      authorization: `qwe1234`+token,
    }}).then(
      (res)=>{
      if(res.data.success=="1")
      {setNotifica(1);
        refreshPage();}
      else{
        setNotifica(2);

      }}).catch(err=>{ setNotifica(2);});
     
   }
      
    return(
       <div className="movie">
      <img src={require('../images/'+img).default} alt={idfilm}/>
      <h3>{nome}</h3>
      <h3>{casa_p}</h3>
      <span className="tag">
       {prezzo}  €
      </span>
      <span className="tag">
       {ora}
      </span>
    
   
 

     <div className="movie-over">
        <h2> Overview</h2>
        <p> {descr}</p>
        <br></br>
        
        <div style={{ display: (showResults ? 'none' : 'inline') }}> 
        <p> PRENOTATI: </p>
        <button className="button-plus" onClick={Prenotazione}>
       <h2> <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> </h2>
     </button>
     <p>POSTI RIMASTI:</p>
     <span className="tag" style={{color:"black"}}>
       {n_big}
      </span>
    
     </div>
     <div style={{ display: (showSoldout ? 'inline' : 'none') }}> 
     <img  src={Soldout}></img>
     </div>
     </div>
     {notifica==1 &&
      <Notify desc="PRENOTAZIONE EFFETTUATA CON SUCCESSO" which={0} time={1000}/>
          }
           {notifica==2 &&
      <Notify desc="QUALCOSA E' ANDATO STORTO" which={1} time={3000}/>
          }
     </div> 
    
  );
  

}

export default Film1; // per esportare questo componente (diciamo classe...)