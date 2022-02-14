const { create, getUsers, updateUser, deleteUser, getUserByEmail, updatePasswordById, getUserByEmail1 } = require("../model/service")
const {getPrensByUser} = require("../model/servicepren");
const {updateFilmPrenMore } = require("../model/servicefilm");
const { genSaltSync, hashSync, compareSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            if (results) {
                return res.json({
                    success: 0,
                    message: "record already exist"
                });
            }

            create(body, (err, results) => {
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
            });
        
        });
    },


    getUserByEmail: (req, res) => {
        const email = req.params.email;
        getUserByEmail(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
   
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


    getUsers: (req, res) => {

        getUsers((err, results) => {
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
    //get i data dal body
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },


    deleteUser: (req, res) => {


        const body = req.body;
        getUserByEmail(body.email, (err, results) => {


            if (err) {
                console.log(err);
                return;
            }


            //results è blank
            else if (!results) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }



            else {

                const result = compareSync(body.password, results.password);
                if (result == false) {
                    return res.json({
                        success: 0,
                        message: "Invalid  password"




                    });
                }
                else {


                    getPrensByUser(body.email, (err, results) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            for (var i = 0; i < results.length; i++) {
                                updateFilmPrenMore(results[i], (err, results) => {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }

                                });


                            }
                            deleteUser(body.email, (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                else {
                                    return res.json({
                                        success: 1,
                                        message: "account eliminato con successo"
                                    });
                                }




                            });

                        }
                    });


                }
            }
        });
    },


    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password (record not found)"
                });
            }
            const result = compareSync(body.password, results.password);
            //se coincidono 
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "30d"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            }
            
            //password non coincide
            else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password" + results.password + body.password + " " + results.email + body.email


                });
            }
        });
    },


    updatePasswordById: (req, res) => {

        const body = req.body;

        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email (record not found)"
                });

            }
            const result = compareSync(body.oldpassword, results.password);

            //se coincidono 
            if (result) {
                const salt = genSaltSync(10);
                body.newpassword = hashSync(body.newpassword, salt);
                updatePasswordById(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    return res.json({
                        success: 1,
                        message: "password updated successfully",
                    });

                });
            }
            //password non coincide
            else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password" + results.password + body.oldpassword + " " + results.email + body.email


                });
            }
        });
    },

}