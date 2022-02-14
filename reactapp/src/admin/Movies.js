import React,{useState,useEffect,useRef} from 'react'; //importo proprio react 
import Notify from '../Util/Notify'
import axios from 'axios';
import Formjs from './Form'


function Movies(){
 

  

  useEffect(() => {
    setNotifica(0)
    });


   
  const [idfilm, setIdfilm] = useState("");
  const [nome, setNome] = useState("");
  const [casa_p, setCasa_p] = useState(""); 
  const[prezzo,setPrezzo]= useState(""); 
  const[data,setData]= useState("");
  const[time,setTime]= useState("");
  const[descr,setDescr]= useState("");
  const[n_big,setN_big]= useState("");
  const file = useRef("");
  const token=localStorage.getItem('token');
  const [notifica, setNotifica] = useState(0);

  function send(){
  
    if(file.current=="" || idfilm.trim()==="" || n_big.trim()===""  || data.trim()===""  || prezzo.trim()==="" || time.trim()===""|| nome.trim()===""  || casa_p.trim()==="" || descr.trim()===""  )
    {   setNotifica(1);
      return}
    const datas=new FormData();
    datas.append("img",file.current);
    axios.post(`https://localhost:8080/upload`,datas,{headers: {
      authorization: `qwe1234`+token,
    }})
    .then(res=>{console.log(res);
     if(res.status==200)
    {logData();}
  else{setNotifica(2)}})
    .catch(err=>setNotifica(2));
    
  }

  var thefile1 = document.getElementById('img');


  const onChangeId=(e)=>{setIdfilm( e.target.value)}
  const onChangeNome=(e)=>{setNome( e.target.value)}
  const onChangeCasa_p=(e)=>{setCasa_p( e.target.value)}
  const onChangePrezzo=(e)=>{setPrezzo( e.target.value)}
  const onChangeData=(e)=>{setData( e.target.value)}
  const onChangeTime=(e)=>{setTime( e.target.value)}
  const onChangeDescr=(e)=>{setDescr( e.target.value)}
  const onChangeN_big=(e)=>{setN_big( e.target.value)}




  function logData(){
    var thefile2=thefile1.value.substring(12);
    // const datas=new FormData();
    // datas.append("img",file);
    axios.post(`https://localhost:8080/film`,{
      idfilm:idfilm,
      nome:nome,
     casa_p:casa_p,
      prezzo:prezzo,  
      ora:time+':00',
      img:  thefile2,
     descr:descr,
    n_big:n_big, 
    data:data,
    }, { headers: {
      authorization: `qwe1234`+token,
    }}).then(
     
      (res)=>{
      if(res.data.success==1)
      {setNotifica(4);}
     else{ setNotifica(3)}
      }).catch(err=>setNotifica(3));
        };
    
    return(
       <div className="addMovie" >
         
       <h2> Aggiungere nuovo Film nel Database </h2>
 
              <div className="container-addMovie">
             
              <Formjs  value={idfilm} type={"number"} onChange={onChangeId} max={"5"} title={"Identificativo Film"} place={"Inserire numero identificativo del Film univoco"}/>
              <Formjs  value={nome} type={"text"} onChange={onChangeNome} max={"30"} title={"Nome Film"} place={"Inserire nome del Film"}/>
              <Formjs  value={casa_p} type={"text"} onChange={onChangeCasa_p} max={"30"} title={"Casa Produttrice"} place={"Inserire nome casa produttrice"}/>
              <Formjs  value={prezzo} type={"number"} onChange={onChangePrezzo} max={"6"} title={"Prezzo Film"} place={"Inserire prezzo per visione del Film "}/>
              <Formjs  value={data} type={"date"} onChange={onChangeData} max={"100"} title={"Data Film"} place={"inserire data di visione del film"}/>
              <Formjs  value={time} type={"time"} onChange={onChangeTime} max={"100"} title={"Orario Film"} place={"Inserire orario del film"}/>
              <Formjs  value={descr} type={"text"} onChange={onChangeDescr} max={"100"} title={"Descirizone Film"} place={"inserire descrizione del film"}/>
              <Formjs  value={n_big} type={"number"} onChange={onChangeN_big} max={"5"} title={"Numeri biglietti Film"} place={"Inserire numero di biglietti massimi per il film"}/>
              
              <div className="formjs">
            <h1>Locandina</h1>
          
           <form  encType="multipart/form-data" > 

    
         <input className='' type="file" id="img" accept=".jpg" multiple="multiple"   onChange={event=>{const load=event.target.files[0]; 
           file.current=load;

      
           }}> 
            </input>
           
    


                   
                       
       </form>
                         <button type="submit" className="button-login" onClick={()=>send()} ><span>UPDATE</span> </button>
     </div> 

              </div> 
        
            
              {notifica==1 &&
      <Notify desc="COMPILA TUTTI I CAMPI" which={1} time={3000}/> 
          }
           {notifica==2 &&
      <Notify desc="ERRORE CARICAMENTE IMMAGINE" which={1} time={3000}/>
          }
             {notifica==3 &&
      <Notify desc="ERRORE CARICAMENTO FILM" which={1} time={3000}/>
          } 
             {notifica==4 &&
      <Notify desc="FILM INSERITO CON SUCCESSO" which={0} time={3000}/>
          }


           </div>

   
  
  );
  

}

export default Movies; 