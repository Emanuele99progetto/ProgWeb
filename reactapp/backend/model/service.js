const pool=require("../config/db");

module.exports={
    create: (data, callBack) => {
        pool.query(
          `insert into utente(username, email, password, admin) 
                    values(?,?,?,?)`,
          [
            data.username,
            data.email,
            data.password,
            data.admin
          ],
          
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }

            return callBack(null, results);
          }
        );
      },

    //leggerà tutti gli user nel database
    getUsers:(callBack)=>{
        pool.query(`select username,email,admin from utente`,
        [],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        });
    },
 

    
    updateUser: (data,callBack)=>{
        pool.query(`update utente set username=?,password=?, admin=? where email=?`,
       [
           data.username,
           data.password,
           data.admin,
           data.email
       ], 

       
       (err,results,fields)=>{
           if(err){
               callBack(err);
           }
           return callBack(null,results);
       });
    },








    deleteUser:(email,callBack)=>{
        pool.query(`delete from utente where email=?`,
            [email],
            (err,results,fields)=>{
                if(err){
                    callBack(err);
                }
                return callBack(null,results);
            });
            
         },
         getUserByEmail1:(email,callBack)=>{
            pool.query(`select * from utente`,
                [email],
                (err,results,fields)=>{
                    if(err){
                        callBack(err);
                        
    
                    }
                    return callBack(null,results);
    
                });},
    getUserByEmail:(email,callBack)=>{
        pool.query(`select * from utente where email=?`,
            [email],
            (err,results,fields)=>{
                if(err){
                    callBack(err);
                    

                }
               
                return callBack(null,results[0]);

            });
    },


    updatePasswordById : ( data,callBack) => {

      pool.query(`UPDATE utente SET password = ?  WHERE email = ?`, [data.newpassword, data.email],
         (err,results,fields)=>{
                    if(err){
                        callBack(err);
                    }
                    return callBack(null,results[0]);
                });
             },

           


};