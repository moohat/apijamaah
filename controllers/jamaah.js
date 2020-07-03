const express = require('express')
const users = express.Router()
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var md5 = require('md5');

const jamaahModel = require('../models/jamaah')

module.exports = {

    getAll: function (req, res, next) {
        let jamaahList = [];
        jamaahModel.findAll({}).then((result) => {
            for (let jamaah of result) {
                jamaahList.push({ id: jamaah.idjamaah, name: jamaah.namajamaah, gender: jamaah.gender, telpjamaah: jamaah.telpjamaah  });
            }
            res.json({ status: "success", message: "products list found!!!", data: { jamaah: jamaahList } });
        }).catch((err) => {
            next(err);
        });
    },

    getById: function (req, res, next) {

        jamaahModel.findByPk(req.params.id).then((result) => {
            if(result){

                res.json({ status: "success", message: "product found!!!", data: { products: result } });
            }else{
                res.json({message: "product Does not found!!!"});

            }
        }).catch((err) => {
            next(err);
        });
    },

    create: function (req, res, next) {
        const{idjamaah, namajamaah, gender, telpjamaah}  = req.body;
        
        const dataJamaah = {
            idjamaah: idjamaah,
            namajamaah: namajamaah,
            gender: gender,
            telpjamaah: telpjamaah,
        }
        jamaahModel.findOne({
            where: {
                idjamaah: req.body.idjamaah,
            }
        }).then((result) => {
            jamaahModel.create(dataJamaah).then((result) => {
                res.json({ status: "success", message: "Jamaah added successfully!!!", data: { result } });

            }).catch((err) => {
                res.send({ error: err })
            });
        }).catch((err) => {
            res.send({ error: `Data Harus diisi` })
        });
    },


    updateById: function (req, res, next) {
        const{namajamaah, gender, telpjamaah}  = req.body;
        
        const jamaahData = {
            namajamaah: namajamaah,
            gender: gender,
            telpjamaah: telpjamaah,
        }
        jamaahModel.findByPk(req.params.id).then((result) => {
            if(result){

                result.update(jamaahData).then((result) => {
                    res.json({ status: "success", message: "jamaah updated successfully!!!", data: result });
    
                }).catch((err) => {
                    next(err);
    
                });
            }else{
                res.json({message: "jamaah Does not found!!!"});

            }
        }).catch((err) => {
            next(err);

        });
    },


    deleteById: function (req, res, next) {
        console.log(req.params.id);
        
        jamaahModel.findOne({
            where: {
                idjamaah: req.params.id,
            }
        }).then((result) => {
            if(result){
                jamaahModel.destroy({
                    where: {
                        idjamaah: req.params.id,        
                    }
                }).then((result) => {
                    res.json({ status: "success", message: "product deleted successfully!!!", data: { result } });    
                }).catch((err) => {
                    res.send({ error: err })    
                });
            }else{
                res.json({error: "data does not exist"})
            }
        }).catch((err) => {
            res.send({ error: err })
        });
    },
}



// users.post('/login', (req, res) =>{
//     User.findOne({
//         where: {
//             telpjamaah: req.body.telpjamaah
//         }
//     })
//     .then((user) => {
//         if(user){
//             if(bcrypt.compareSync(req.body.password, user.password)){
//                 let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
//                     expiresIn: 1440
//                 })
//                 // res.send(token)

//                res.json({ status: "success", message: "user found!!!", data: { user: user.telpjamaah, token: token } });

//             }
//             else {
//                 res.json({ status: "error", message: "Invalid password!!!", data: null });
//              }
//         }else{
//             res.status(400).json({error: 'User Does not exist'})
//         }
//     }).catch((err) => {
//         res.status(400).json({error: err})
//     });
// })

// module.exports = users