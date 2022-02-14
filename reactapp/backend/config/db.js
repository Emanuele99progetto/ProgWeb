
const {createPool}=require('mysql2');

const pool=createPool(

{
    port: 3306,
    host: "localhost",
    user: "root",
    
password: "password",
database: "pweb",
connectionLimit:10} 
);

module.exports=pool;

pool.query(`select * from utente`,(err,result,fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})