import React, { useState, useEffect } from 'react'; //importo proprio react 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faCog, faTimesCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { removeUserSession } from '../Util/token';
import axios from 'axios';
import { useHistory, withRouter } from "react-router-dom";
import Notify from '../Util/Notify'

function Profile() {



  const [deletepass, setDeletePass] = useState('')
  const [buttondel, setButtonDel] = useState(false)
  const history = useHistory();
  const [remove, setRemove] = useState(true);
  const [showResults, setShowResults] = useState(true)
  const [oldpass, setOldPass] = useState('')
  const [newpass, setNewPass] = useState('')
  const [newpass2, setNewPass2] = useState('')
  const [notifica, setNotifica] = useState(0);
  const token=localStorage.getItem('token');
  const nome=localStorage.getItem('username').substring(1, localStorage.getItem('username').length - 1);
  const bottone = showResults ? "CAMBIA PASSWORD" : "INFO UTENTE";
  const buttonsure = buttondel ? "ELIMINA" : "CONFERMI?";

  const Click = () => setShowResults(!showResults);
  const Delete = () => {
    setRemove(!remove);
    setShowResults(true);
  }

  function send() {
    if(oldpass.trim()==="" || newpass.trim()===""  || newpass2.trim()==="" )
    {   setNotifica(10);
      return}
    if (newpass != newpass2) {
      setNotifica(1);
    }
    else{

    axios.post(`https://localhost:8080/user`, {
      oldpassword: oldpass,
      newpassword: newpass,
      email: localStorage.getItem('email').substring(1, localStorage.getItem('email').length - 1)

    }, { headers: {
      authorization: `qwe1234`+token,
    }})
      .then(res => {
        console.log(res);
        if (res.data.success == 1) {    
           setNotifica(2);
      }
        else {    setNotifica(3); }
      })
      .catch(err => setNotifica(3));
    }
   
  }




  function logout() {
    removeUserSession();
    setNotifica(6);
    localStorage.removeItem('pop_status')
    history.push("/login");


  }



  const deleteAcc = () => {
   
     setNotifica(0);
     if(deletepass.trim()==="" )
     {alert('COMPILA TUTTI I CAMPI DISPONIBILI!')
      return}
     axios.delete(` https://localhost:8080/`, {

      data: {
        password: deletepass,
        email: localStorage.getItem('email').substring(1, localStorage.getItem('email').length - 1),

      },  headers: {
       authorization: `qwe1234`+token,
     }
    }).then(
      (res) => {
      
        if (res.data.success == 1) {
          logout();
   
        }
        else {
          setNotifica(4);
        }
      }).catch(err =>  setNotifica(5));

  };



  const handleSubmit = (e) => {
    e.preventDefault();
   setNotifica(0);
  }


  const onChangeDelete = (e) => { setDeletePass(e.target.value) 
                                  setButtonDel(false);}
  const onChangeold = (e) => { setOldPass(e.target.value) }
  const onChangenew = (e) => { setNewPass(e.target.value) }
  const onChangenew2 = (e) => { setNewPass2(e.target.value) }

  return (

    <div className="profile">

      <div className="profile-container">
        <h1>PROFILO UTENTE</h1>
        <div className="profile-image">
          <FontAwesomeIcon icon={faUserCircle} className="profile-icon-user" />
          <div className="profile-image-over">
            {remove ?
              (<FontAwesomeIcon icon={faTimesCircle} className="profile-icon-user" style={{ color: "red" }} onClick={Delete} />) :

              (<FontAwesomeIcon icon={faArrowCircleLeft} className="profile-icon-user" style={{ color: "red" }} onClick={Delete} />)
            }
          </div>
        </div>
        <button onClick={Click} style={{ visibility: (remove ? 'visible' : 'hidden') }}> {bottone}</button>

        <div className="profile-info">
          <div className="profile-settings" style={{ justifyContent: "center" }}>
            <div>  <FontAwesomeIcon icon={faCog} className="profile-icon-settings" /> </div><h3>IMPOSTAZIONI </h3></div>
          <div className="profile-settings">
            <div> <h3>Utente: </h3></div>{nome}</div>
          <div className="profile-settings">
            <div> <h3>Email: </h3> </div><div> <h3>{localStorage.getItem('email').substring(1, localStorage.getItem('email').length - 1)} </h3></div></div>
          <div className="profile-settings">
            <div> <h3>Ruolo: </h3> </div><div> <h3>{localStorage.getItem('admin').substring(1, localStorage.getItem('admin').length - 1) == 0 ? 'Utente' : 'Admin'} </h3></div></div>


          <div className="profile-over" style={{ visibility: (showResults ? 'hidden' : 'visible'), transform: (showResults ? 'translateY(-500px)' : 'none'), opacity: (showResults ? '0' : '1') }} >
            <form className="profile-form" onSubmit={handleSubmit} >
              <i className="fas fa-cog"></i>

              <div className="col">
                <div className="profile-form-setting">
                  <label>Password attuale: </label>
                  <input type="password" value={oldpass} onChange={onChangeold} >
                  </input>
                </div>
              </div>
              <div className="col">
                <div className="profile-form-setting">
                  <label>Password nuova: </label>
                  <input type="password" name="email" value={newpass} onChange={onChangenew}>
                  </input>
                </div>
              </div>
              <div className="col">
                <div className="profile-form-setting">
                  <label>Conferma Password nuova: </label>
                  <input type="password" name="email" value={newpass2} onChange={onChangenew2} >
                  </input>
                </div>
              </div>



              <button  onClick={send}  ><span>UPDATE</span> </button>

            </form>
          </div>



          <div className="profile-over" style={{ visibility: (remove ? 'hidden' : 'visible'), transform: (remove ? 'translateY(-500px)' : 'none'), opacity: (remove ? '0' : '1') }} >
            <form className="profile-form" onSubmit={handleSubmit} >
         
              <h2>RIMOZIONE ACCOUNT</h2>
              <div className="col">
                <div className="profile-form-setting">
                  <label>Password attuale: </label>
                  <input type="password" value={deletepass} onChange={onChangeDelete} >
                  </input>
                </div>
              </div>

    
       
            </form>
          
            <button  type="submit" onClick={ () => {buttondel ? deleteAcc() : setButtonDel(true)}}  ><span>{buttonsure} </span> </button>
          </div>





        </div>
        {notifica==1 &&
      <Notify desc="NUOVA PASSWORD DIVERSA NEI 2 FORM" which={1} time={3000}/>
          }
           {notifica==2 &&
      <Notify desc="PASSWORD CAMBIATA CON SUCCESSO" which={0} time={3000}/>
          }
             {notifica==3 &&
      <Notify desc="ERRORE CAMBIAMENTO PASSWORD" which={1} time={3000}/>
          } 
             {notifica==4 &&
      <Notify desc="ERRORE ELIMINAZIONE ACCOUNT, CONTROLLA CHE LA PASSWORD SIA QUALLA GIUSTA" which={1} time={3000}/>
          }
             {notifica==5 &&
      <Notify desc="ERRORE ELIMINAZIONE ACCOUNT" which={1} time={3000}/>
          } 
                   {notifica==6 &&
      <Notify desc="ACCOUNT ELIMINATO" which={0} time={3000}/>
          }
                  {notifica==10 &&
      <Notify desc="COMPILA TUTTI I CAMPI DISPONIBILI" which={1} time={3000}/>
          } 

      </div>
 

    </div>
  );


}

export default Profile; 