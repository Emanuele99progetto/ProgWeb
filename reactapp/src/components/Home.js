import React, {useState,useLayoutEffect,useEffect} from 'react'; //importo proprio react 
import myImage1 from '../cinema/cinema1.jpg';
import myImage2 from '../cinema/galleria2.jpg';
import myImage3 from '../cinema/bar2.jpg';
import banner from '../cinema/banner.jpg';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import Below from './Below';


function Home (){
   


 const [model,setModel]=useState(false);
 const[tempimgSrc,setTempImgSrc]=useState('');

 useEffect(() => {
  setTimeout(() => {

    let pop_status = localStorage.getItem('pop_status');
    if(!pop_status){
      getImg(banner);
      localStorage.setItem('pop_status',1);}
  
  }, 1000);
 
  },[]);



 const getImg=(imgSrc)=>{
  setTempImgSrc(imgSrc);
  setModel(true);
 }



    return( 
    
       <div className="home">
            <div className={model? "model open" : "model"}>
      <img src={tempimgSrc} />
      <CloseIcon onClick={()=>setModel(false)}/>
    </div>
         <div className="home-background">
         </div>
          <div class="home-text">
           <h1>IL PIU GRANDE CINEMA DELLA REGIONE</h1>
           <p>Con ben 30 SALE SCHERMI e più di 10000 metri quadrati di grandezza risultiamo
             essere il più grande cinema della Regione Marche. </p>
             <Link to="/about">
    
             <button className="home-button">
               SCOPRI DI PIU SU CHI SIAMO!</button>
               </Link>
          </div>
          <div className="home-descrizione">
            <h1>UN CINEMA UNICO</h1>
            <p>Non abbiamo eguali in nessuna provincia della regione</p>
             
            <div className="home-row">
              <div className="home-col">
                <h3> Film in Anteprima</h3>
                <p>Grazie ad accordi commerciali con gli studi di produzione cinematografica</p>
              </div>
              <div className="home-col">
                <h3> Piu grande cinema regionale</h3>
                <p>Con piu di 10 mila metri quadrati di superficie</p>
              </div>
              <div className="home-col">
                <h3> 2 servizi ristorazione </h3>
                <p>Per accompagnare la visione del tuo cinema preferito come meglio gradisci</p>
              </div>

            </div>

            <div className="home-photo">
               <h1>GALLERIA PIENA DI FOTO!</h1>
               <p>DA VEDERE UNA PER UNA </p>
               <div className="home-row">
                 <div className="home-photo-col">
                   <img src={myImage1} className="home-img" onClick={()=>getImg(myImage1)}></img>
                 </div>
                 <div className="home-photo-col">
                   <img src={myImage2} className="home-img" onClick={()=>getImg(myImage2)}></img>
                 </div>
                 <div className="home-photo-col">
                   <img src={myImage3} className="home-img" onClick={()=>getImg(myImage3)}></img>
                 </div>


               </div>
               <Link to="/galleria">
               <button className="home-photo-button">
              VISITA PIU FOTOGRAFIE E IMMERGITI  !!!</button>
              </Link>
            </div>

          
           <Below/>

          </div>
          

  
       </div>   
 
  );
  

}

export default Home; // per esportare questo componente (diciamo classe...)