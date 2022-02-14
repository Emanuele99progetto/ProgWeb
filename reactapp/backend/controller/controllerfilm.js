const {getFilmsByDate,isFilmRoom,updateFilmPrenMore,updateFilmPrenLess,getFilmByKey,createFilm,getFilmsById,getFilms,updateFilm,deleteFilm,getFilmByNome}= require("../model/servicefilm")



module.exports={
    createFilm: (req, res) => {
        const body = req.body;

        getFilmByKey(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
           else if (results != null) {
                res.status(404).send({
                    message: `Film già presente.`
                });}

        else {     
              createFilm(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: "Database connection errror"
              });
            }
            return res.status(200).json({
              success: 1,
              data: results
            });
          });}


        });





     
      
      },

      getFilmsByDate:(req,res)=>{
        const data=req.params.data;
        getFilmsByDate(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            //results è blank
            if(!results){
              return res.json({
                  success:0,
                  message: "record not found"
              });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },

 getFilmsById:(req,res)=>{
     const idfilm=req.params.idfilm;
     getFilmsById(idfilm,(err,results)=>{
         if(err){
             console.log(err);
             return;
         }
         //results è blank
         if(!results){
           return res.json({
               success:0,
               message: "record not found"
           });
         }
         return res.json({
             success:1,
             data:results
         });
     });
 },

 
 getFilmByKey:(req,res)=>{
    var data = 
        {
            "idfilm": req.params.idfilm,
            "ora": req.params.ora,
            "data": req.params.data
        }
    ;  
    getFilmByKey(data,(err,results)=>{
        if(err){
            console.log(err);
            return;
        } 
        
        //results è blank
        if(!results){
          return res.json({
              success:0,
              message: "record not found"
          });
        }
        return res.json({
            success:1,
            data:results
        });
    });
},
 
 getFilms:(req,res)=>{
  
    getFilms((err,results)=>{
        if(err){
            console.log(err);
            return;
        }
        return res.json({
            success:1,
            data:results
        });
    });

},



//get i data dal body
updateFilm:(req,res)=>{
    const body= req.body;
    updateFilm(body,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success:0,
                message: "failed to update film"
            });
          } 
        return res.json({
            success:1,
            message: "updated successfully"
        });
    });
},
deleteFilm:(req,res)=>{
    const data=req.body;
    getFilmByKey(data,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }
       else if (!results ) {
            res.status(404).send({
                message: `Film not found.`
            });}
      else{  deleteFilm(data,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }
  
        return res.json({
            success:1,
            message: "film deleted successfully"
        });
    });}
});
},




} 