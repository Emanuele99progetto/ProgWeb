import React, {useState}from 'react';






const Form =(props)=> {



 const handleSubmit=(e)=>{
    e.preventDefault()
    if(props.value.trim()==="")
    {alert('Scrivi qualcosa!')
      return}}




    return(
          //onSubmit è per dire cosa fare dopo che facciamo INVIO nel form
       <div className="formjs">
      <h1>{props.title}</h1>
       <form onSubmit={handleSubmit}> 
         <input className='form-input' type={props.type} value={props.value} placeholder={props.place} onChange={props.onChange} max={props.max}>
            </input>
       </form>
       </div>    // questi marcatori sono java script, ma react li trasforma in html
  
  )
  

}

export default Form;