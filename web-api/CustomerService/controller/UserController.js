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
        user: 'hirushanbim123@gmail.com',
        pass: 'Janith@12345'
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
    console.log(resettoken.resettoken)

    const mailOptions = {
        from: 'your emil',
        to: email,
        subject: 'Password Reset',
        html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://localhost:4200/resetPasswordCommon/${resettoken. resettoken}' +  + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'`,

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
    // console.log(req.headers.email )
    UserDTO.findOne({ userEmail: req.headers.email }).then(result => {
        // console.log(result)
        if (result != null) {
            bcrypt.compare(req.headers.password, result.userPassword, function(err, finalOutput) {
                if (finalOutput === true) {
                    const user = {
                        "email": result.userEmail
                    };
                    const { userPassword, ...userWithoutHash } = result.toObject();
                    const token = jwt.sign({ sub: result.id }, config.secret);
                    resp.status(200).json({ message: "Success!", userData: user, ...userWithoutHash, token });
                } else {
                    resp.status(200).json({ message: "User Email or Passwords are Not Valid" });
                }
            });
        } else {
            // console.log('dsa')
            resp.status(200).json({ message: "Record Not Found!" });
        }
    }).catch(onerror => {
        resp.status(500).json(onerror);
    })
};


const validPasswordToken = async(req, res) => {

    if (!req.body.resettoken) {
        return res
            .status(500)
            .json({ message: 'Token is required' });
    }
    const user = await ResetPassword.findOne({
        resetToken: req.body.resettoken
    });
    if (!user) {
        return res
            .status(409)
            .json({ message: 'Invalid URL' });
    }
    User.findOneAndUpdate({ _id: user._userId }).then(() => {
        res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
        return res.status(500).send({ msg: err.message });
    });






}
const newPassword = (req, res) => {
    //userId  hoyaganna ona email eka balala

    ResetPassword.findOne({ resettoken: req.body.resettoken }, function(err, userToken, next) {
        if (!userToken) {
            return res
                .status(409)
                .json({ message: 'Token has expired' });
        }

        UserDTO.findOne({
            _id: userToken._userId

        }, function(err, userEmail, next) {
            if (!userEmail) {
                return res
                    .status(409)
                    .json({ message: 'User does not exist' });
            }
            return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: 'Error hashing password' });
                }
                userEmail.userPassword = hash;
                console.log(userEmail.userPassword)

                userEmail.save(function(err) {
                    if (err) {
                        console.log(err)
                        return res
                            .status(400)
                            .json({ message: 'Password can not reset.' });
                    } else {
                        userToken.remove();
                        return res
                            .status(201)
                            .json({ message: 'Password reset successfully' });
                    }

                });
            });
        });

    })




}

const requestPassword = async(req, res) => {
    if (!req.body.email) {
        return res
            .status(500)
            .json({ message: 'Email is required' });
    }
    const user = await UserDTO.findOne({
        userEmail: req.body.email
    });
    console.log(req.body.email)
    if (!user) {
        return res
            .status(409)
            .json({ message: 'Email does not exist' });
    }
    var resettoken = new ResetPassword({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function(err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        ResetPassword.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
        res.status(200).json({ message: 'Reset Password successfully.' });

        sendPassEmail(req.body.email, resettoken)
            ///Nodamailer eka
    })


}


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