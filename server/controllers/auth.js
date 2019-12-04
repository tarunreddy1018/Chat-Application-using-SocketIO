const bcrypt = require('bcryptjs');

const RegisteredUser = require('../models/RegisteredUser');

const { checkIfUserNameIsPresent } = require('../controllers');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    RegisteredUser.findOne({email: email})
        .then(user => {
            if(!user) {
                return res.send({errorMessage: 'User with this email does not exist'});
            }
            else {
                bcrypt
                    .compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.isAuthenticated = true;
                            req.session.user = user;
                            return req.session.save(err => {
                                res.status(200).send();
                            });
                        }
                        else {
                            return res.send({errorMessage: 'Invalid Password'});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    RegisteredUser.findOne({email: email})
        .then(user => {
            if(user) {
                return res.send({errorMessage: 'User with this email already exists'});
            }
            else {
                bcrypt
                    .hash(password, 12)
                    .then(hashedPassword => {
                        const newUser = new RegisteredUser({
                            email: email,
                            password: hashedPassword,
                        });
                        return newUser.save(); 
                    })
                    .then(result => {
                        return res.status(200).send();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        return res.status(200).send();
    });
}

exports.verifyDetails = (req, res, next) => {
    let name = req.body.name;
    let room = req.body.room;

    checkIfUserNameIsPresent(name, room)
            .then(errorMessage => {
                return res.send({errorMessage: errorMessage});
            })
            .catch(err => {
                console.log(err);
            });
}