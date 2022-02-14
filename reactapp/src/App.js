import React,{useState,useEffect,useLayoutEffect}from 'react'; //importo proprio react 

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import './App.css';
import Login from './components/Login';
import Sign from   './components/Sign';
import Tariffa from './components/Tariffa';
import Home from './components/Home';
import About from './components/About';
import Contatti from './components/Contatti';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Galleria from './components/Galleria';
import Prog from './components/Prog';
import Pren from './components/Pren';
import Profile from './components/Profile';
import Movies from './admin/Movies'
import Beginner from './components/Beginner';
import { useLocation, Redirect } from 'react-router-dom';
import Private from './routes/Private';
import Public from './routes/Public';
import PrivateAdm from './routes/PrivateAdm';


function App(){






  
  const { pathname } = useLocation();
  return(
    <div>

    { (pathname !== '/login' && pathname!=='/registrazione' && pathname!=='/'  && pathname!=='/movie'  && pathname!=='/profilead') && <Navbar /> }

  <Switch> 
  
  <Route exact path="/" component={Beginner} />
       <Private  path="/home" component={Home}  role={localStorage.getItem('admin')}/>
        <Private path="/programmazione" component={Prog}  role={localStorage.getItem('admin')}/>
        <Private path="/prenotazione" component={Pren}  role={localStorage.getItem('admin')}/>
       <Private path="/galleria" component={Galleria}  role={localStorage.getItem('admin')}/>
       <Private path="/tariffa" component={Tariffa}  role={localStorage.getItem('admin')}/>
       <Private path="/contatti" component={Contatti}  role={localStorage.getItem('admin')}/>
       <Private path="/about" component={About}  role={localStorage.getItem('admin')}/>
       <Private path="/profile" component={Profile}  role={localStorage.getItem('admin')}/>
       <Public path="/login" component={Login}  role={localStorage.getItem('admin')}/>
       <Public path="/registrazione" component={Sign}  role={localStorage.getItem('admin')}/>
       <Route path="*" render={() => localStorage.getItem('admin')==1?  <Redirect to="/movie" /> : <Redirect to="/home" />} />
  
  </Switch>
  { (pathname == '/movie' || pathname=='/profilead' ) && <Navbar2 /> }
  
  <Switch>
  <PrivateAdm path="/movie" component={Movies} role={localStorage.getItem('admin')} />
       <PrivateAdm path="/profilead" component={Profile}  role={localStorage.getItem('admin')}/>

       </Switch>

    
  </div>);
  }
  

export default App; // per esportare questo componente (diciamo classe...)
