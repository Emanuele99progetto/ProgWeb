import React,{useLayoutEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getEmail, getToken,getRole } from '../Util/token';



// handle the public routes
function Public({ component: Component, ...rest }) {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

  return (

    <Route
      {...rest}

      render={(props) =>{ 
        if(getToken()==null){ return (<Component {...props} />)}
         else if(getRole()=='1'){ return(<Redirect to={{ pathname: '/movie' }} />)}
         else if(getRole()=='0'){ return(<Redirect to={{ pathname: '/home' }} />)}}}
    />
  )
}
 
export default Public;