
import React,{useState} from 'react'; 
import myImage3 from '../cinema/campus.jpg';



function About (){
 
    const text= `CineReact S.R.L. è il prodotto delle menti dei cugini Domizi, intenzionati a creare il più grande cinema della regione Marche. Il Cinema ha un dimensione superiore ai 10000 metri quadrati e possiede piu di 30 sale schermi, con più di 7000 posti a sedere. Comprende 2 bar all'interno per ogni ala per la consumazione. 
    CineReact S.R.L. ha stipulato accordi commerciali con i più importanti studi di produzione cinematografica del mondo. Tra questi ci sono sicuramente Universal Pictures, Paramount Pictures, Warner Bros. Pictures, Walt Disney Pictures e Columbia Pictures. 
    Questi contratti permettono al cinema di poter mostrare in anteprima diversi titoli con qualche giorno di anticipo rispetto ai concorrenti. `

    const [isTruncated,setIsTruncated]=useState(true);
 
    const stringa= isTruncated? text.slice(0,110): text;
    
    const bottone=isTruncated? "READ MORE": "READ LESS";

     function toggleisTruncated(){
       setIsTruncated(!isTruncated);
     }
    return(
    
     <div className="about">
       <div className="about-back">
      <div className="section">
          <div className="container"> 
             <div className="content-section">
                     <div ClassName="title">
                       <h1> ABOUT US </h1>

                     </div>
         
               
          
            <div className="about-content">
             
            
           
             <h3> Azienda fondata nel mese di Luglio dell'anno 2021, con sede a Montecassiano (MC) dai cugini Emanuele Domizi e Pierpaolo Domizi </h3>
              <p> {stringa} </p>
              
           <div className="button">
              <button onClick={toggleisTruncated}>{bottone}</button>
           </div>
       
           </div>
       
          </div>
          <div className="image-section">
          <img src={myImage3}></img>
          </div>
      </div>
      
      </div>
      </div>
      </div>
  );
  

}

export default About; 