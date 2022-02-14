import React, { useLayoutEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../Util/token';

// handle the private routes
function PrivateAdm({ component: Component, role, ...rest }) {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <Route
      {...rest}
      render={(props) => getToken() && role==1 ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />


  )
}

export default PrivateAdm;