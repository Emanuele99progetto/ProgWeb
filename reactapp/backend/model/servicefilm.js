const pool=require("../config/db");

module.exports={
    createFilm: (data, callBack) => {
        pool.query(
          `insert into film(idfilm,nome,casa_p,img,prezzo,ora,descr,n_big,data) 
                    values(?,?,?,?,?,?,?,?,?)`,
          [ data.idfilm,
            data.nome,
           data.casa_p,
           data.img,
            data.prezzo,  
            data.ora,
           data.descr,
           data.n_big, 
           data.data,
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
    getFilms:(callBack)=>{
        pool.query(`select idfilm,nome, casa_p,prezzo,ora,descr,n_big,data from film`,
        [],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        });
    },
    getFilmsById:(idfilm,callBack)=>{
        pool.query(`select idfilm,nome, casa_p,prezzo,ora,descr,n_big,data from film where idfilm=?`,
        [idfilm],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        });
    },

    getFilmsByDate:(data,callBack)=>{
        pool.query(`select * from film where data=?`,
        [data],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
            
        });
    },
   
   

    getFilmByKey:(data,callBack)=>{
        
        pool.query(`select idfilm,nome, casa_p,img,prezzo,ora,descr,n_big,data from film where idfilm=? and ora=? and data=?`,
        [data.idfilm,
            data.ora,
            data.data,
   ],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results[0]);
        });
    },

    isFilmRoom:(data,callBack)=>{
        pool.query(`select idfilm from film where idfilm=? and ora=? and data=? and n_big!=0`,
        [data.idfilm,
            data.ora,
         data.data],(err,results,field)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results[0]);
        });
    },
   



    updateFilmPrenMore: (data,callBack)=>{
        pool.query(`update film set  n_big=n_big+1 where idfilm=? and ora=? and data=?`,
       [ data.idfilm,
        data.ora,
        data.data
       ], 
       (err,results,fields)=>{
           if(err){
               callBack(err);
           }
           return callBack(null,results);
       });
    },

    updateFilmPrenLess: (data,callBack)=>{
        pool.query(`update film set  n_big=n_big-1 where idfilm=? and ora=? and data=?`,
       [  data.idfilm,
        data.ora,
        data.data], 
       (err,results,fields)=>{
           if(err){
               callBack(err);
           }
           return callBack(null,results);
       });
    },


    updateFilm: (data,callBack)=>{
        pool.query(`update film set nome=?,casa_p=?,prezzo=?, ora=?, descr=?, n_big=?,data=? where idfilm=?`,
       [
        data.nome,
        data.casa_p,
        data.prezzo,
        data.ora,
        data.descr,
        data.n_big,
        data.idfilm,
        data.data,
       ], 
       (err,results,fields)=>{
           if(err){
               callBack(err);
           }
           return callBack(null,results);
       });
    },



    deleteFilm:(data,callBack)=>{
        pool.query(`delete from film where idfilm=?`,
            [data.idfilm],
            (err,results,fields)=>{ 
                if(err){
                    callBack(err);
                }
                
                return callBack(null,results[0]);
            });
         },
    getFilmByNome:(nome,callBack)=>{
        pool.query(`select * from film where nome=?`,
            [nome],
            (err,results,fields)=>{
                if(err){
                    callBack(err);
                }
                return callBack(null,results[0]);
            });
    }
};