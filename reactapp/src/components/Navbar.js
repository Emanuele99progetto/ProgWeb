
import '../App.css';
import {Link,Redirect} from "react-router-dom";
import {useHistory, withRouter } from "react-router-dom";
import React, {useState,useEffect,useLayoutEffect} from 'react'; //importo proprio react 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { removeUserSession } from '../Util/token';


function Navbar (){


  const history = useHistory();

    const [toggleMenu,setToggleMenu]=useState(false)
    const [screenWidth,setscreenWidth]=useState(window.innerWidth) 

    const toggleNav=()=>
    {setToggleMenu(!toggleMenu)
   }

   useEffect(()=>{ 
   const changeWidth=()=>{
      setscreenWidth(window.innerWidth);
   }
   window.addEventListener('resize',changeWidth)
    return()=>
    {window.removeEventListener('resize',changeWidth)}
   },[])
 
    const logout=()=>{
      removeUserSession();
      localStorage.removeItem('pop_status')
      history.push("/login");
    }  
     

  
    return(

       <div className="navbar" > 

        <div className="navuser" onClick={logout} >
 
        <FontAwesomeIcon icon={faUserCircle} className="icon-navuser"/> 
       
    

            
        <h1 style={{marginLeft:"0"}}>{localStorage.getItem('email').substring(1,localStorage.getItem('email').length-1)}</h1>
      
        <div className="navuser-over">
        <h1 style={{marginLeft:"40%"}}>Logout</h1>
        </div>
        </div>

       {(toggleMenu || screenWidth>1048) && (
       <ul  className="links" onClick={()=>setToggleMenu(false)}>
          <Link to="/home" style={{color:"white"} }><li >HOME</li></Link>
          <Link to="/programmazione" style={{color:"white"}}><li>PROGRAMMAZIONE </li></Link>
          <Link to="/prenotazione" style={{color:"white"}}><li>PRENOTAZIONI </li></Link>
          <Link to="/galleria" style={{color:"white"}}><li>GALLERIA</li></Link>
          <Link to="/tariffa" style={{color:"white"}}><li>TARIFFE </li></Link>
          <Link to="/contatti" style={{color:"white"}}>  <li>CONTATTI</li> </Link>
          <Link to="/about" style={{color:"white"}}> <li>ABOUT</li> </Link>
          <Link to="/profile" style={{color:"white"}}> <li>PROFILO</li> </Link>
    
         
       </ul> )}
       <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleNav} /> 
       </div>    // questi marcatori sono java script, ma react li trasforma in html
       
  );


}

export default Navbar; // per esportare questo componente (diciamo classe...)