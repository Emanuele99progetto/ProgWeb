
import '../App.css';
import {Link,Redirect} from "react-router-dom";
import {useHistory, withRouter } from "react-router-dom";
import React, {useState,useEffect,useLayoutEffect} from 'react'; //importo proprio react 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';



function Navbar2 (){


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
      localStorage.removeItem('token');
      localStorage.removeItem('pop_status')
      history.push("/");
    }  
     

  
    return(

       <div className="navbar" > 

        <div className="navuser" onClick={logout} >
 
        <FontAwesomeIcon icon={faUserCircle} className="icon-navuser"/> 
       
    

            
        <h1>{localStorage.getItem('email').substring(1,localStorage.getItem('email').length-1)}</h1>
      
        <div className="navuser-over">
        <h1 style={{marginRight:"30px"}}>Logout</h1>
        </div>
        </div>

       <h2 > CINEMA </h2>
       {(toggleMenu || screenWidth>1048) && (
       <ul  className="links" onClick={()=>setToggleMenu(false)}>
            <Link to="/movie" style={{color:"white"}}> <li>MOVIE</li> </Link>
          <Link to="/profilead" style={{color:"white"}}><li>PROFILO</li></Link>
         
       </ul> )}
       <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleNav} /> 
       </div>    // questi marcatori sono java script, ma react li trasforma in html
       
  );


}

export default Navbar2; // per esportare questo componente (diciamo classe...)