import React, { useEffect, useState, useLayoutEffect } from "react";
import Film2 from "../pagine/Film2";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import Below from './Below';
import uniqueid from 'uniqid'


function Pren() {

  const [films, setFilms] = useState([]);
  const [pren, setPren] = useState([]);


  useEffect(() => {


    loadPren();
    loadMovies();

  }, [pren && pren.length]);



  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });






  //salva le prenotazioni dell'utente
  async function loadPren() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userStr = localStorage.getItem('email');
    const userStri = JSON.parse(userStr);
    axios.get(`https://localhost:8080/pren/` + userStri, {
      headers: {
        authorization: `qwe1234` + token,
      }
    }).then(
      response => {
        const prenotazioni = response.data.data;
        setPren(prenotazioni);
      }

    );


  };


  //ora che ha l'id/data/ora della prenotazione ne ricava i vari film e li salva sulla lista film
  async function loadMovies() {

    if (pren) {
      pren.map((prenotazione) => loadMovie(prenotazione));

    }

  }


  //carica per ogni prenotazione il proprio film 
  async function loadMovie(prenotazione) {
    const token = localStorage.getItem('token');
    const offset = new Date(prenotazione.data).getTimezoneOffset();
    const data0 = new Date(new Date(prenotazione.data).getTime() - (offset * 60 * 1000));
    const data = data0.toISOString().split('T')[0];
    axios.get(`https://localhost:8080/film/` + prenotazione.idfilm + `/` + prenotazione.ora + `/` + data, {
      headers: {
        authorization: `qwe1234` + token,
      }
    }).then(
      response => {
        const film = response.data.data;
        setFilms(oldArray => [...oldArray, film]);

      });


  }









  return (<div className="giorno-body">
    <h1 className="cinema-h1"> PRENOTAZIONI  </h1>
    <div className="movie-container">

      {films && films.length > 0 && films.sort((a, b) => b.data > a.data ? 1 : -1).map((film) => <Film2 key={uniqueid()} {...film} />)}

      {!films || films.length < 1 && <div className="empty">
        <span> Nessun film prenotato!!!</span>

        <span> PRENOTATI SUBITO, PRIMA CHE FINISCANO I POSTI DEL TUO FILM PREFERITO !!! </span>

        <Link to="/programmazione" className="pren-ref">

          <button className="pren-button">
            <FontAwesomeIcon icon={faHandPointRight} className="fontawe" />
            PRENOTATI SUBITO</button>
        </Link>



      </div>}
    </div>
    <Below />
  </div>

  );
}

export default Pren;