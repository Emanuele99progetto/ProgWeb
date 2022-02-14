import React, {useState}from 'react'; //importo proprio react 
import Foto from '../pagine/Foto';
import CloseIcon from '@material-ui/icons/Close';
import Below from './Below';
import Atrio1 from '../cinema/atrio1.jpg';
import Atrio2 from '../cinema/atrio2.jpg';
import Atrio3 from '../cinema/atrio3.jpg';
import Galleria1 from '../cinema/galleria1.jpg';
import Galleria2 from '../cinema/galleria2.jpg';
import Galleria3 from '../cinema/galleria3.jpg';
import Galleria4 from '../cinema/galleria4.jpeg';
import Galleria5 from '../cinema/galleria5.jfif';
import Galleria6 from '../cinema/galleria6.jpg';
import Galleria7 from '../cinema/galleria7.jpg';
import Galleria8 from '../cinema/galleria8.jpg';
import Galleria9 from '../cinema/galleria9.jpg';
import Galleria10 from '../cinema/galleria10.jfif';
import Galleria11 from '../cinema/galleria11.jpg';
import Galleria12 from '../cinema/galleria12.jpg';
import Galleria13 from '../cinema/galleria13.jpg';
import Galleria14 from '../cinema/galleria14.jpeg';
import Cinema1 from '../cinema/cinema1.jpg';
import Cinema2 from '../cinema/cinema2.jpg';
import Cinema3 from '../cinema/cinema3.jpg';
import Bar2 from '../cinema/bar2.jpg';


function Galleria (){


                         
    const[data,setPosts]=useState([
      {id:1, imgSrc: Atrio1, description: 'Descrizione Atrio 1 '},
      {id:2, imgSrc: Atrio2, description: 'Descrizione Atrio 2'},
      {id:3, imgSrc: Atrio3, description: 'Descrizione Atrio 3 '},
      {id:4, imgSrc: Galleria1, description: 'Descrizione Sala Numero 1 '},
      {id:5, imgSrc: Galleria2, description: 'Descrizione Sala Numero 2 '},
      {id:6, imgSrc: Galleria3, description: 'Descrizione Sala Sala Numero 3'},
      {id:7, imgSrc: Galleria4, description: 'Descrizione Sala Numero 4'},
      {id:8, imgSrc: Galleria5, description: 'Descrizione Sala Numero 5 '},
      {id:9, imgSrc: Galleria6, description: 'Descrizione Sala Numero 6'},
      {id:10, imgSrc: Galleria7, description: 'Descrizione Sala Numero 7 '},
      {id:16, imgSrc: Galleria8, description: 'Descrizione Sala Numero 8 '},
      {id:17, imgSrc: Galleria9, description: 'Descrizione Sala Numero 9'},
      {id:18, imgSrc: Galleria10, description: 'Descrizione Sala Numero 10'},
      {id:19, imgSrc: Galleria11, description: 'Descrizione Sala Numero 11'},
      {id:20, imgSrc: Galleria12, description: 'Descrizione Sala Numero 12 '},
      {id:21, imgSrc: Galleria13, description: 'Descrizione Sala Numero 13'},
      {id:22, imgSrc: Galleria14, description: 'Descrizione Sala Numero 14'},
      {id:23, imgSrc: Bar2, description: 'Descrizione Bar'},
      {id:24, imgSrc: Cinema1, description: 'Descrizione Edificio '},
      {id:25, imgSrc: Cinema2, description: 'Descrizione Edificio'},
      {id:26, imgSrc: Cinema3, description: 'Descrizione Edificio'},

     ]);

     const [model,setModel]=useState(false);
     const[tempimgSrc,setTempImgSrc]=useState('');

     const getImg=(imgSrc)=>{
      setTempImgSrc(imgSrc);
      setModel(true);
     }
  return(
    <div className="main-gallery">
    <div className={model? "model open" : "model"}>
      <img src={tempimgSrc} />
      <CloseIcon onClick={()=>setModel(false)}/>
    </div>
   <h1 className="cinema-h1"> GALLERIA SALE </h1>
   <div className="gallery1">
      
         
        {data.map((item,index)=>(
            <div className="pics1" onClick={()=>getImg(item.imgSrc)}> 
        <Foto key={index} src={item.imgSrc} description={item.description}/> </div> )) 
        }
        </div>

        <Below/>
        </div>
  );
  


         
    
     
   
 

}

export default Galleria; // per esportare questo componente (diciamo classe...)