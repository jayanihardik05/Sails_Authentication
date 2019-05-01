/**
 * RegistationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    signup: (req, res) => {
        console.log("sigup")
        registation.find().exec((err, result) => {
        if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/signup', { registation: result })
        })
    },

    logindata: (req, res) => {
        registation.find().exec((err, result) => {
        if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/login', { registation: result })
        })
    },
    
    forgetpassword: (req, res) => {
        registation.find().exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/forgetpassword', { registation: result })
        })
    },

    
    listdata: (req, res) => {
        registation.find().exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/registation', { registation: result })
        })
    },
    adddata: (req, res) => {
        registation.create(req.body).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/registation/listdata')
        })

    },
    editdata: (req, res) => {
        registation.findOne({ _id: req.params.id }).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/edit', { registation: result })
        })

    },
    deletedata: (req, res) => {
        registation.destroy({ id: req.params.id }).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/registation/listdata')
        })

    },
    updatedata: (req, res) => {
        registation.update({ _id: req.params.id }, req.body).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/registation/listdata')
        })

    }
};

