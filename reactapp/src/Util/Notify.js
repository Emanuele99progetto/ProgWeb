import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


toast.configure();



function Notify(props) {


  useEffect(() => {

    notifica();


  }, []);


  let which = props.which
  let desc = props.desc
  let time = props.time
  const notifica = () => {
    if (which === 0) { toast.success(desc, { position: toast.POSITION.TOP_CENTER, autoClose: time }); }
    else if (which === 1) { toast.error(desc, { position: toast.POSITION.TOP_CENTER, autoClose: time }); }
    else { toast(desc, { position: toast.POSITION.TOP_CENTER, autoClose: time }); }
  }


  return (<div className="">
    {/* <button onClick={notifica}> NOTIFY </button> */}
  </div>);
}

export default Notify;
