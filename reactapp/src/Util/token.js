// return the user data from the session storage
 export const getUser = () => {
    const userStr = localStorage.getItem('email');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the local storage
  export const getToken = () => {
    return localStorage.getItem('token') || null;
  }
  export const getRole = () => {
    return localStorage.getItem('admin') || null;
  }
  export const getEmail= () => {
    return localStorage.getItem('email') || null;
  }
  export const getName= () => {
    return localStorage.getItem('username') || null;
  }


  // remove the token and user from the local storage
  export const removeUserSession = () => {
    localStorage.setItem('token','');
    localStorage.setItem('email','');
    localStorage.setItem('admin','');
    localStorage.setItem('username','');
  }
   
  // set the token and user from the local storage
  export const setUserSession = (token, email,admin,username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('admin', JSON.stringify(admin));
    localStorage.setItem('username',JSON.stringify(username));
  }