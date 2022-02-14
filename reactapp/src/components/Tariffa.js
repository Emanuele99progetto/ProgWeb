import React,{useState} from 'react'; //importo proprio react 
import Ticket from '../cinema/ticket.jpg';
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Below from './Below';
import Cola from '../cinema/cola.png';
import Cioccolato from '../cinema/cioccolato.jpg';
import Car1 from '../cinema/caramelle1.jpg';
import Car2 from '../cinema/caramelle2.jpg';
import Car4 from '../cinema/caramelle3.jpg';
import Car3 from '../cinema/caramelle4.jpg';
import Car5 from '../cinema/caramelle5.webp';
import Cedrata from '../cinema/cedrata.jpg';
import Pop from '../cinema/pop.jpg';

function Tariffa (){
 
  const images = [Cioccolato,Car1,Car2,Car3,Car4,Car5,Pop,Cola,Cedrata];

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    responsive: [{
      breakpoint: 1250,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      }
    }],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  
  };



    return(
      <div className="tariffa">

       <h1 className="cinema-h1"> TARIFFE </h1>
     
       <div className="tariffa-container">
         <h1 className="tariffa-titolo"> PREZZO BIGLIETTI </h1>
           <div className="tariffa-in">
               
               <div class="tariffa-title">
                 <h1> Tariffa </h1> 
                <h1> Infrasettimanale </h1></div> 
                <img src={Ticket} className="tariffa-img" alt="description of image"></img>
                <h1 className="prezzo-h1">   € 5,99 </h1>
                <h4>* Il prezzo riportato è a scopo puramente indicativo.</h4>
           </div>
           <div className="tariffa-end">
           <div className="tariffa-title">
           <h1> Tariffa </h1> 
           <h1> Weekend </h1>
           </div>
           <img src={Ticket} className="tariffa-img"></img>
           <h1 className="prezzo-h1">  € 8,99 </h1>
           <h4>* Il prezzo riportato è a scopo puramente indicativo.</h4>
           </div>
          
         </div>
        <div className="consumazione">
        <h1 className="tariffa-titolo"> CONSUMAZIONE </h1>
         
        <div className="tariffa-slider">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
            <img src={img} alt={img} />
          </div>
        ))}
      </Slider>
    </div>
        <div className="cibo">
                <h2 className="subtitolo-cibo">CIBO:</h2>
                <h3>-Popcorn 150grammi..............€3,50</h3>
                <h3>-Caramelle x100grammi.........€4,50</h3>
                <h3>-Ciccolatini x100grammi........€5,00</h3>
                <h3>-Patatine 200 grammi.............€4,00</h3>
                </div>
                <div className="cibo">
                <h2 className="subtitolo-cibo">BIBITE:</h2>
                <h3>-Acqua 750ml............................€2,00</h3>
                <h3>-Acqua 1000ml..........................€2,50</h3>
                <h3>-Coca Cola 500ml......................€3,50</h3>
                <h3>-Coca Cola 750ml......................€4,50</h3>
                <h3>-Cedrata 500ml..........................€3,50</h3>
                <h3>-Cedrata 750ml..........................€4,50</h3>
              
                </div>
      </div>

  <Below/>
  </div>
  );
  

}

export default Tariffa; // per esportare questo componente (diciamo classe...)