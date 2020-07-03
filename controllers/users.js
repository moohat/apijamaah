const express = require('express')
const users = express.Router()
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var md5 = require('md5');

const userModel = require('../models/user')

process.env.SECRET_KEY = 'secret';
module.exports = {

    register: function (req, res, next) {
        const today = new Date()
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created: today
        }
        userModel.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((user) => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (req.body.password.length < 4) {
                            res.json({ error: "password atleast 4 digits" })

                        } else {

                            userData.password = md5(hash)
                            userModel.create(userData)
                                .then(user => {
                                    res.json({ status: user.email + ' registered' })
                                })
                                .catch(err => {
                                    res.send('error: ' + err)
                                })
                        }
                    })
                } else {
                    res.json({ error: "User already exist" })
                }
            }).catch((err) => {
                res.send('error : ' + err)
            });

    },


    login: function (req, res, next) {
        userModel.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((user) => {
                if (user) {
                    if (bcrypt.compare(req.body.password, user.password)) {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        // res.send(token)

                        res.json({ status: "success", message: "user found!!!", data: { email: user.email, token: token } });

                    }
                    else {
                        res.json({ status: "error", message: "Invalid password!!!", data: null });
                    }
                } else {
                    res.status(400).json({ error: 'User Does not exist' })
                }
            }).catch((err) => {
                res.status(400).json({ error: err })
            });
    },
}