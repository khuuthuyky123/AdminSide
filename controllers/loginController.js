const loginModel = require("../models/loginModel");
const bcrypt = require('bcrypt');
exports.index = async function(req, res, next) {
    try {
        const ref = req.headers.referer;
        req.session.retUrl = ref;
        //console.log(ref);
        res.render("login", { layout: false })
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.login = async function(req, res, next) {
    try {
        const user = await loginModel.list.singleByUserName({ name: req.body.username })
        if (user == null)
            return res.render("login", {
                layout: false,
                err_message: "Invalid username or password"
            });
        const ret = bcrypt.compareSync(req.body.password, user[0].pwd);
        if (ret == false)
            return res.render("login", { layout: false, err_message: "Invalid username or password" });
        req.session.isAuth = true;
        req.session.authUser = user;

        var url = req.session.retUrl || '/';
        if (req.session.authUser[0].id != req.session.preUser)
            url = '/';
        res.redirect(url);
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.logout = async function(req, res, next) {
    try {
        req.session.preUser = req.session.authUser[0].id;
        req.session.isAuth = false;
        req.session.authUser = null;
        res.redirect("/login");
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};