const {createUser,getUsers,deleteUser,updateUsers,login,getUserByEmail,updatePasswordById}= require("../controller/controller");
const {createFilm,getFilmByKey,getFilmsByDate,getFilms,updateFilm,deleteFilm}=require("../controller/controllerfilm");
const router=require("express").Router();
const {checkToken}=require("../auth/token_valid");
const {createPren,getPrensByUser,getPrensByIdFilm,getPrens,deletePren,UpdateUserFilms}=require("../controller/controllerpren");



/* INSERIMENTO IMMAGINE MULTER*/
const fs = require('fs');
const path=require('path');
const multer = require('multer');
const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, '../src/images')
    },
    
    
    filename: function(req, file, cb) {
        if (fs.existsSync(path.join('../../src/images',file.originalname))) {
            return cb(new Error('File name already exist'));}
        else{cb(null, file.originalname)}
    }
});
const upload = multer({storage}); 





router.post("/",createUser);
router.post("/user",checkToken,updatePasswordById);
router.get("/",checkToken,getUsers);
router.get("/user/:email",checkToken,getUserByEmail); 
router.patch("/",checkToken,updateUsers);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);




const uploadSingleImage = upload.single('img');

    router.post('/upload',checkToken, function (req, res) {

    uploadSingleImage(req, res, function (err) {

                 if (err) {
                    return res.status(400).send({ message: err.message })
                }
        
              
           const file = req.file;
           res.status(200).send({
           filename: file.filename,
           mimetype: file.mimetype,
           originalname: file.originalname,
           size: file.size,
           fieldname: file.fieldname
      })
 })
 })
        



router.post("/film",checkToken,createFilm);
router.get("/film/film",checkToken,getFilms);
router.get("/film/:data",checkToken,getFilmsByDate);
router.get("/film/:idfilm/:ora/:data",checkToken,getFilmByKey);
router.patch("/film",checkToken,updateFilm);
router.delete("/film",checkToken,deleteFilm); 


router.post("/pren",checkToken,createPren);
router.get("/pren",checkToken,getPrens);
router.get("/pren/:email",checkToken,getPrensByUser);
router.post("/pren",checkToken,getPrensByIdFilm);
router.delete("/pren",checkToken,deletePren);




module.exports=router;

