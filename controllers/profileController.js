const profileModel = require("../models/profileModel");

exports.index = async function(req, res, next) {
    try {
        profileDetail = profileModel.list.singleByUserName(req.session.authUser[0].usn);
        res.render('profile', { profileDetail });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.edit = async function(req, res, next) {
    try {

    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};