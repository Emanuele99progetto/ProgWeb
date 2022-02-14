import React, { useLayoutEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../Util/token';

// handle the private routes
function Private({ component: Component, role, ...rest }) {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <Route
      {...rest}
      render={(props) => getToken() && role==0 ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />


    // <Route
    //   {...rest}
    //   render={(props) => {
    //     if (getToken && role == 0) 
    //     { return <Component {...props} /> }
    //     else if (getToken && role == 1)
    //     {return }
    //     else
    //       {return<Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    //   }}
    // />

  )
}

export default Private;