const { createPren, getPrensByUser, getPrens, getPrensByUserFilm, getPrensByIdFilm, deletePren } = require("../model/servicepren");
const { updateFilmPrenLess, updateFilmPrenMore, isFilmRoom } = require("../model/servicefilm");

const { genSaltSync, hashSync, compareSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createPren: (req, res) => {
        const body = req.body;


        //controlla se il film con stesso id e stessa data già esiste come record
        getPrensByUserFilm(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            else if (results.length > 0) {
                res.status(404).send({
                    message: `Prenotazione già effettuata con questo Utente .`
                });
            }
            else {

                //in caso non esista vede se è libero 
                isFilmRoom(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else if (!results) {
                        res.status(404).send({
                            message: `Prenotazioni piene per questa fascia oraria.`
                        });
                    }



                    //in caso sia vuoto allora crea la prenotazione 
                    else {
                        createPren(body, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database connection errror"
                                });
                            }
                
                            updateFilmPrenLess(body, (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (!results) {
                                    return res.json({
                                        success: 0,
                                        message: "failed to update film"
                                    });
                                }
                                return res.json({
                                    success: 1,
                                    message: "updated successfully"
                                });
                            });

                        });
                    }
                });

            }
        });
    },


    getPrensByUser: (req, res) => {
        const email = req.params.email;
        getPrensByUser(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //results è blank
            if (results.length < 1) {

                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },


    getPrensByIdFilm: (req, res) => {
        const id = req.params.id;
        getPrensByIdFilm(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //results è blank
            if (!results) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },






  
    getPrens: (req, res) => {

        getPrens((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });

    },

    UpdateUserFilms: (req, res) => {
        const email = req.params.email;
       
        getPrensByUser(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //results è blank
            else if (results.length < 1) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            else {

                    for (var i = 0; i < results.length; i++) {
                        updateFilmPrenMore(results[i], (err, results) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (results.length < 1) {
                                return res.json({
                                    success: 0,
                                    message: "failed to update film"
                                });
                            }


                        });

                    }
                    return res.json({
                        success: 1,
                        message: "Posti disponibili aggiornati",
                        result: results
                    });



                }


            });
    },


    deletePren: (req, res) => {
        const body = req.body;

        getPrensByUserFilm(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            else if (results.length == 0) {
                res.status(404).send({
                    message: `Prenotazione not found .`
                });
            }



            else {




                deletePren(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }


                    updateFilmPrenMore(body, (err, results) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (!results) {
                            return res.json({
                                success: 0,
                                message: "failed to update film"
                            });
                        }
                        return res.json({
                            success: 1,
                            message: "Prenotazione eliminata successfully"
                        });
                    });
                });
            }
        });
    },
}