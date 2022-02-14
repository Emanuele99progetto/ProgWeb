import React, { useEffect, useState } from "react";
import Film1 from "../pagine/Film1";
import axios from 'axios';



function Giorno1({ date }) {

  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerms] = useState('');
  const [data, setData] = useState();
  let counter = 0;
  const [showResults, setShowResults] = useState(true);

  const message = searchTerm == "" ? "Nessun film disponibile per questa data! " : "Nessun film trovato! ";


  useEffect(() => {
    const token=localStorage.getItem('token');
    date = new Date(new Date(date).getTime() - (new Date(date).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    setData(date);
    axios.get(`https://localhost:8080/film/` + date,{ headers: {
      authorization: `qwe1234`+token,
    }}).then(
      response => {
        const film = response.data.data;
        setFilms(film);
   
      });


  }, []);

  const handleOnSubmit = (e) => {

    e.preventDefault();

  };

  const handleOnChange = (e) => {
    setSearchTerms(e.target.value);
  }


  return (<div className="giorno-body">
    <header className="movie-header">
      <form onSubmit={handleOnSubmit}>
        <input className="search" type="text" placeholder="Search..." value={searchTerm}
          onChange={handleOnChange} />
      </form>
    </header>
    <div className="datetime">
      <span> {data}</span>
    </div>
    <div className="movie-container">



      {films && films.length > 0 && films.filter((film) => {
        console.log(searchTerm)
        if (searchTerm === "") {
          counter = counter + 1;
          return film
        }
        else if (film.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
          counter = counter + 1;
          return film;
        }
      }).map((film) => <Film1 key={film.id} date={data} {...film} />)}
      {counter == 0 && <div className="empty">
        {message}
      </div>}


    </div>
  </div>
  );
}

export default Giorno1;