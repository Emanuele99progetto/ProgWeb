const pool=require("../config/db");

module.exports={
    createPren: (data, callBack) => {
        pool.query(
          `insert into prenotazione(email,idfilm,data,ora) 
                    values(?,?,?,?)`,
          [
            
            data.email,
            data.idfilm,
            data.data,
            data.ora
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
    getPrens:(callBack)=>{
        pool.query(`select email,idfilm from prenotazione`,
        [],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results); 
        });
    },
    getPrensByUser:(email,callBack)=>{
        pool.query(`select email,idfilm,data,ora from prenotazione where email=? order by data desc,ora desc`,
        [email],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        });
    },
    

   getPrensByUserFilm:(data,callBack)=>{
    pool.query(`select email,idfilm,data,ora from prenotazione where idfilm=? and email=? and data=? and ora=?`,
    [data.idfilm, 
    data.email, 
    data.data,
    data.ora],(err,results,field)=>{
        if(err){
           return callBack(err);
        }
        return callBack(null,results);
    });
},

    getPrensByIdFilm:(data,callBack)=>{
        pool.query(`select email,idfilm,data,ora  from prenotazione where idfilm=? and data=? and ora=?`,
        [data.idfilm,
        data.data,
    data.ora],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        });
    },

 

    deletePren:(data,callBack)=>{
        pool.query(`delete from prenotazione where idfilm=? and email=? and data=? and ora=?`,
            [data.idfilm,
             data.email,
            data.data,
            data.ora],
            (err,results,fields)=>{
                if(err){
                    callBack(err);
                }
                return callBack(null,results);
            });
         },
   
};