const UserDTO = require('../model/UserDTO')
const EmailDTO = require('../model/EmailDTO')
const ResetPassword = require('../model/ResetToken')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const config = require('../../Config/config.json')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bimsaram997@gmail.com',
        pass: 'BimsaraM9@123'
    }
})


const sendContent = (email, receive, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: receive,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    })

}
const sendMails = (req, resp) => {
    const { email, receive, subject, text } = req.body;
    sendContent(email, receive, subject, text, function(err, data) {
        if (err) {
            resp.status(500).json({ message: 'Internal error' });
            console.log(err)
        } else {
            resp.json({ message: 'Email Sent' });
        }
    })
    console.log("Data", req.body)
}
const sendReqEmailContent = (email, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'bimsaram997@gmail.com',
        subject: 'Password Reset',
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    })

}
const sendPassEmail = (email, resettoken) => {
    console.log(resettoken)

    const mailOptions = {
        from: email,
        to: 'bimsaram997@gmail.com',
        subject: 'Password Reset',
        html: ``,

    };
    transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, data);
            }
        })
        // const {email, text} = req.body;
        // sendReqEmailContent(email, text, function (err, data) {
        //     if (err){
        //         resp.status(500).json({message: 'Internal error'});
        //         console.log(err)
        //     }else {
        //         resp.json({message: 'Email Sent'});
        //         console.log(resp)
        //     }
        // })
        // console.log("Data", req.body)
}

const validPasswordToken = async(req, res) => {
    if (!req.body.resetToken) {
        return res.status(500).json({ message: 'Token is required!' })
    }
    const user = await ResetPassword.findOne({
        resetToken: req.body.resetToken
    });
    if (!user) {
        return res.status(409).json({ message: 'Invalid URl' })
    }
    UserDTO.updateOne(({ _id: user._userID }, { $set: { _id: user.userID } }))
        .then(() => {
            res.status(200).json({ message: 'Token is verified!' })
        }).catch((err) => {
            return res.status(500).sed({ message: err.message })
        })



}
const newPassword = async(req, res) => {
    //userId  hoyaganna ona email eka balala

    ResetPassword.findOne({ resetToken: req.body.resetToken }, function(err, userToken, next) {
        if (!userToken) {
            return res.status(409).json({ message: "Token has expired!" })
        }
        UserDTO.findOne({
            _id: userToken.userID
        }, function(err, userEmail, next) {
            if (!userEmail) {
                return res.status(409)
                    .json({ message: 'User dos not exist' })
            }
            return bcrypt.hash((req.body.newPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(400).json({ message: 'Error hassing passowrd' })
                }
                userEmail.hash = hash;
                userEmail.save(function(err) {
                    if (err) {
                        return res.status(400).json({ message: 'Password can not reset' })
                    } else {
                        userToken.remove();

                        //send karanna mail eka katada userta
                        //email password


                        return res.status(201).json({ message: 'Password reser succesfully' })
                    }
                })


            }))



        })

    })
}

const requestPassword = async(req, res) => {
    console.log(req.body)
    const _findEmail = await UserDTO.findOne({ userEmail: req.body.email });
    console.log(_findEmail);
    if (_findEmail != null) {
        var resetToken = new ResetPassword({
            userID: _findEmail._id,
            resetToken: crypto.randomBytes(16).toString("hex"),
        });

        resetToken.save(function(err) {
            if (err) {
                return;
            }
            ResetPassword.find({
                userID: _findEmail._id,
                resetToken: { $ne: resetToken.resetToken }
            }).remove().exec();

            sendPassEmail(req.body.email, resetToken)
                ///Nodamailer eka

            //methana mail body ekak hdala
            //methanin yanne new paswowrd component redirect karanna ona
        })
    } else {
        res.status(404).json({ message: false });
    }


}

const register = async(req, resp) => {

    console.log(req.body);

    UserDTO.findOne({ userEmail: req.body.userEmail }).then(result => {
        if (result == null) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.userPassword, salt, function(error, hash) {
                    const admin = new UserDTO(req.body);
                    admin.userPassword = hash
                        //userPassword: hash,


                    admin.save().then(result => {
                        resp.status(200).json({ isSaved: true, data: result });
                    }).catch(error => {
                        res.status(500).json(error);
                    })

                })
            })
        } else {
            resp.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        reps.status(500).json(er);
    });


    // UserDTO.findOne({ userEmail: req.body.userEmail }, (error, result) => {


    //     if (result == null) {
    //         bcrypt.genSalt(10, function(err, salt) {
    //             bcrypt.hash(req.body.userPassword, salt, function(error, hash) {
    //                 const admin = new UserDTO(req.body);
    //                 admin.userPassword = hash
    //                     //userPassword: hash,


    //                 admin.save().then(result => {
    //                     resp.status(200).json({ message: true, data: result });
    //                 }).catch(error => {
    //                     res.status(500).json(error);
    //                 })

    //             })
    //         });
    //     } else {

    //         res.status(200).json({ isSaved: false, data: result });

    //     }

    // }).catch(er => {
    //     res.status(500).json(er);
    // });





};

const loginUser = async(req, resp) => {
    UserDTO.findOne({ userEmail: req.headers.email }).then(result => {
        if (result != null) {
            //
            bcrypt.compare(req.headers.password, result.userPassword, function(err, finalOutput) {
                if (finalOutput === true) {
                    const user = {
                            "email": result.userEmail
                        }
                        //  const user =  UserDTO.findOne({email})

                    const { userPassword, ...userWithoutHash } = result.toObject();

                    const token = jwt.sign({ sub: result.id }, config.secret);


                    resp.status(200).json({ message: "Success!", userData: user, ...userWithoutHash, token });
                } else {
                    resp.status(200).json({ message: "User Email or Passwords are Not Valid" });
                }
            });
        } else {
            resp.status(200).json({ message: "Record Not Found!" });
        }
    }).catch(onerror => {
        resp.status(500).json(onerror);
    })
};

const getAllUsers = (req, resp) => {
    UserDTO.find({ userRole: 'Supervisor' }).then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result);
    })
};
const getManagers = (req, resp) => {
    UserDTO.find({ userRole: 'Service Manager' }).then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result);
    })
};

const getAllUserNew = (req, resp) => {
    UserDTO.find().then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result);
    })
};

const deleteUser = (req, resp) => {
    UserDTO.deleteOne({ userEmail: req.headers.id }).then(result => {
        if (result.deletedCount > 0) {
            resp.status(200).json({ message: 'deleted' });
        } else {
            resp.status(200).json({ message: 'try Again' });
        }
    }).catch(error => {
        resp.status(500).json({ error });
    })
};

const getUser = (req, resp) => {
    const { id } = req.params;
    UserDTO.findById(id).then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result);
    })
};
const updateUser = (req, resp) => {
    UserDTO.updateOne({ userEmail: req.body.userEmail }, {
        $set: {
            userName: req.body.userName,
            userWorks: req.body.userWorks,
            userNic: req.body.userNic,
            userMobile: req.body.userMobile,
            userRole: req.body.userRole,


        }
    }).then(result => {
        if (result.nModified > 0) {
            console.log(result)
            resp.status(200).json({ message: 'updated' })
        } else {
            resp.status(500).json({ message: 'Try Again' })
        }
    }).catch(error => {
        resp.status(500).json(error)
    });


}
const getOneUser = (req, res) => {
    console.log(req.params.userNic);
    UserDTO.find({
        userNic: req.params.userNic
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });
}
const getOneMan = (req, res) => {
    console.log(req.params.managerName);
    UserDTO.find({
        userName: req.params.managerName
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });
}
const getOneSup = (req, res) => {
    console.log(req.params.supervisorName);
    UserDTO.find({
        userName: req.params.supervisorName
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });
}

const getUserInfo = async(req, resp, next) => {
    console.log(req.query)

    await UserDTO.find({ userNic: req.query.userNic }).then(result => {
        resp.status(200).json(result);
        console.log(result)
    }).catch(error => {
        resp.status(500).json(result)
    });

}
module.exports = {
    register,
    getAllUsers,
    loginUser,
    getUser,
    sendMails,
    requestPassword,
    newPassword,
    validPasswordToken,
    sendPassEmail,
    getAllUserNew,
    deleteUser,
    updateUser,
    getManagers,
    getOneUser,
    getOneMan,
    getOneSup,
    getUserInfo


}