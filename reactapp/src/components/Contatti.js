import React, { useState } from 'react'; //importo proprio react 
import emailjs from 'emailjs-com';
import { faEnvelope, faPhone, faMapMarker, fabFacebook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import Below from './Below';
import Notify from '../Util/Notify'


function Contatti() {

  const [notifica, setNotifica] = useState(0);
  const [oggetto, setOggetto] = useState("");
  const [tel, setTel] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const onChangeOggetto = (e) => { setOggetto(e.target.value) }
  const onChangeTel = (e) => { setTel(e.target.value) }
  const onChangeMessaggio = (e) => { setMessaggio(e.target.value) }



  function notify() {

    setNotifica(0);
  }


  function sendEmail(e) {

    e.preventDefault();
    if (oggetto.trim() === "" || tel.trim() === "" || messaggio.trim() === "") {
      setNotifica(3);
      return;

    }
    emailjs.sendForm('service_uvgqhv4', 'template_a5ktalm', e.target, 'user_4nRZyCzNdyc3eMH1vkEzU')
      .then((result) => {

        setNotifica(2);
      }, (error) => {
        setNotifica(1)
      });
    setOggetto("");
    setMessaggio("");
    setTel("");
    e.target.reset();
  }

  return (

    <div className="Contatti">
      <h1 className="cinema-h1"> CONTATTACI </h1>
      <div className="Contatti-container">
        <div className="Contatti-info">

          <h4>CONTATTATICI </h4>
          <p>SIAMO SEMPRE DISPONIBILI</p>
          <div className="icon-text">
            <FontAwesomeIcon icon={faPhone} style={{
              webkitTransform: "scaleX(-1)",
              transform: "scaleX(-1)"
            }} className="icon-contatto" />
            <span>345 880 6029</span>
          </div>
          <div className="icon-text">
            <FontAwesomeIcon icon={faEnvelope} style={{
              webkitTransform: "scaleX(-1)",
              transform: "scaleX(-1)"
            }} className="icon-contatto" />
            <span>kurorolucifer@outlook.it</span>
          </div>
          <div className="icon-text">
            <FontAwesomeIcon icon={faMapMarker} style={{
              webkitTransform: "scaleX(-1)",
              transform: "scaleX(-1)"
            }} className="icon-contatto" />
            <span>via ungaretti 18</span>
          </div>
          <div className="social-media">
              <div className="icona-cerchio">

                <FontAwesomeIcon icon={faFacebookSquare} onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://facebook.com';
                }} />


              </div>
          
              <div className="icona-cerchio">
                <FontAwesomeIcon icon={faInstagramSquare} onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://www.instagram.com/';
                }} />
              </div>
            
            
              <div className="icona-cerchio">
                <FontAwesomeIcon icon={faTwitterSquare} onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://twitter.com';
                }} />
              </div>
       
          </div>
        </div>
        <form onSubmit={sendEmail} className="Contatti-form">

          <div className="col">
            <div className="form-group">
              <label>Email </label>
              <input type="email" name="email" value={localStorage.getItem('email').substring(1, localStorage.getItem('email').length - 1)} >
              </input>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Oggetto</label>
              <input type="text" name="object" onChange={onChangeOggetto} value={oggetto}>
              </input>
            </div>
            <div className="form-group">
              <label> Numero Cellulare</label>
              <input type="number" name="phone" onChange={onChangeTel} value={tel}>
              </input>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label> MESSAGGIO</label>
              <textarea name="message" onChange={onChangeMessaggio} value={messaggio}></textarea>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <button className="send" onClick={notify}>INVIA</button>
            </div>
          </div>

        </form>
      </div>
      {notifica == 1 &&
        <Notify desc="ERRORE SPEDIZIONE EMAIL" which={1} time={3000} />
      }
      {notifica == 2 &&
        <Notify desc="EMAIL SPEDITA CON SUCCESSO" which={0} time={3000} />
      }
      {notifica == 3 &&
        <Notify desc="COMPILA TUTTI I CAMPI" which={1} time={3000} />
      }




      <Below />
    </div>
  );


}

export default Contatti; // per esportare questo componente (diciamo classe...)