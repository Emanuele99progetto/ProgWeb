import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Notify from '../Util/Notify'

function Sign() {


  const [notifica, setNotifica] = useState(0);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState(0);


  const onChangeUser = (e) => { setUser(e.target.value) }
  const onChangeEmail = (e) => { setEmail(e.target.value) }
  const onChangePassword = (e) => { setPassword(e.target.value) }



  const handleSubmit = (e) => {
    e.preventDefault();
    setNotifica(0);
  }



  function logData() {
    if (password.trim() === "" || email.trim() === "" || user.trim() === "") {
      setNotifica(2);
      return
    }

      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(email) ) {
        alert("FORMATO EMAIL NON CORRETTO")
        return;
       }
    axios.post(`https://localhost:8080/`, {
      username: user,
      email: email,
      password: password,
      admin: admin,
    }).then(
      (res) => {
        console.log(res)
        if (res.data.success == 1) {
          setNotifica(3);
           history.push("/movie");
           }
        else {
          setNotifica(1);
        }
      });


  };



  return (
    <div className="login" >

      <h1> SIGN UP </h1>

      <div className="login-container">
        <form action="Pros.js" onSubmit={handleSubmit}>
          <h2> WELCOME </h2>
          <div className="log-input" >
            <div className="log-i">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h5> Username </h5>
            <input value={user} className="input-log" type="text" onChange={onChangeUser}></input>
          </div>
          <div className="log-input">
            <div className="log-i">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <h5> Email </h5>
            <input value={email} className="input-log" type="email" onChange={onChangeEmail} ></input>
          </div>
          <div className="log-input">
            <div className="log-i">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <h5> Password </h5>
            <input value={password} className="input-log" type="password" onChange={onChangePassword} ></input>
          </div>
          <h5> Scegli il tipo di utente </h5>
          <div>

            <input type="radio" name="admin" value="UTENTE" checked onChange={() => { setAdmin(0) }} /> UTENTE





            <input type="radio" name="admin" value="ADMIN" onChange={() => { setAdmin(1) }} /> ADMIN

          </div>

          <button className="button-login" onClick={logData}> SIGN UP </button>
        </form>


      </div>
      <Link to="/login">

        <button className="button-log" >
          <FontAwesomeIcon icon={faHandPointRight} />
          Autenticati</button>
      </Link>
      {notifica==1 &&
      <Notify desc="ERRORE INSERIMENTO VALORI" which={1} time={3000}/>
          }
            {notifica==2 &&
      <Notify desc="COMPILA TUTTI I CAMPI" which={1} time={3000}/>
          }
                {notifica==3 &&
      <Notify desc="ISCRIZIONE EFFETTUATA CON SUCCESSO" which={0} time={2000}/>
          }



    </div>



  );


}

export default Sign; 