import React, { useState } from 'react'; //importo proprio react 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useHistory, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { getRole, getToken, setUserSession } from '../Util/token';
import jwt from 'jwt-decode'
import Notify from '../Util/Notify'

function Login() {




  const history = useHistory();

  const [notifica, setNotifica] = useState(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => { setEmail(e.target.value) }
  const onChangePassword = (e) => { setPassword(e.target.value) }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotifica(0);
  }


  function login() {
 
    if(password.trim()==="" || email.trim()==="" )
    {setNotifica(2);
     return}

    axios.post(`https://localhost:8080/login`, {
      email: email,
      password: password,

    }).then(
      (res) => {
        if (res.data.success == '1') {
          const decoded = jwt(res.data.token);
          setUserSession(res.data.token, email, decoded.result.admin,decoded.result.username);


          //QUI SI DECIDE SE ADMIN O USER
          if (localStorage.getItem('admin') == '0') { 
            setNotifica(3);
            history.push("/home"); }
          else {
            setNotifica(3);
            history.push("/movie");
          }
        }
        else {
          setNotifica(1);
        }
      });
  }


  return (
    <div className="login" >

      <h1> LOGIN  </h1>


      <div className="login-container">

        <form action="Pros.js" onSubmit={handleSubmit}>

          <h2> WELCOME </h2>
          <div className="log-input">
            <div className="log-i">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h5> Email </h5>
            <input value={email} className="input-log" type="text" onChange={onChangeEmail} ></input>
          </div>
          <div className="log-input" >
            <div className="log-i">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <h5> Password </h5>
            <input value={password} className="input-log" type="password" onChange={onChangePassword} ></input>
          </div>
          <button className="button-login" onClick={login}> LOGIN </button>
        </form>


      </div>
      <Link to="/registrazione">

        <button className="button-reg" >
          <FontAwesomeIcon icon={faHandPointRight} />
          Registrati</button>
      </Link>
      {notifica==1 &&
      <Notify desc="ERRORE INSERIMENTO VALORI" which={1} time={3000}/>
          }
            {notifica==2 &&
      <Notify desc="COMPILA TUTTI I CAMPI" which={1} time={3000}/>
          }
                     {notifica==3 &&
      <Notify desc="AUTENTICAZIONE EFFETTUATA CON SUCCESSO" which={0} time={2000}/>
          }

    </div>



  );


}

export default Login; 