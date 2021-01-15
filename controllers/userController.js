const userModel = require("../models/userModel");
var formidable = require("formidable"); // used for parsing form data
var fs = require("fs");

exports.index = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 0) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
        }
        if (req.query.constructor === Object && Object.keys(req.query).length === 0) {
            res.redirect("/users/?page=0&limit=10")
        }

        const categories = [{ name: "Admin" }, { name: "User" }];

        //pass data to view display
        const list_user = await userModel.list.get(pageOptions);

        for (item of list_user) {
            if (item.usn == req.session.authUser[0].usn)
                item.isEditable = false;
            else
                item.isEditable = true;
        }
        const n = await userModel.list.getAmount();
        var count = [];

        for (var i = 1; i <= Math.ceil(n[0].amount / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });

        }
        res.render("users", { list_user, count, categories });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.block = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.body.page, 0) || 0,
            limit: parseInt(req.body.limit, 0) || 10
        }

        const ret = await userModel.list.block(req.body);
        const categories = [{ name: "Admin" }, { name: "User" }];

        //pass data to view display
        const list_user = await userModel.list.search(req.body, pageOptions);
        const n = await userModel.list.getSearchAmount(req.body);
        for (item of list_user) {
            if (item.usn == req.session.authUser[0].usn)
                item.isEditable = false;
            else
                item.isEditable = true;
        }
        var count = [];
        for (var i = 1; i <= Math.ceil(n[0].amount / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        res.render("users", { list_user, categories, count });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.unblock = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.body.page, 0) || 0,
            limit: parseInt(req.body.limit, 0) || 10
        }
        const ret = await userModel.list.unblock(req.body);
        const categories = [{ name: "Admin" }, { name: "User" }];

        for (item of list_user) {
            if (item.usn == req.session.authUser[0].usn)
                item.isEditable = false;
            else
                item.isEditable = true;
        }
        //pass data to view display
        const list_user = await userModel.list.search(req.body, pageOptions);
        const n = await userModel.list.getSearchAmount(req.body);

        var count = [];
        for (var i = 1; i <= Math.ceil(n[0].amount / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        res.render("users", { list_user, categories, count });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.search = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.body.page, 0) || 0,
            limit: parseInt(req.body.limit, 0) || 10
        }
        const categories = [{ name: "Admin" }, { name: "User" }];
        const list_user = await userModel.list.search(req.body, pageOptions);
        const n = await userModel.list.getSearchAmount(req.body);
        for (item of list_user) {
            if (item.usn == req.session.authUser[0].usn)
                item.isEditable = false;
            else
                item.isEditable = true;
        }
        var count = [];
        for (var i = 1; i <= Math.ceil(n[0].amount / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        res.render("users", { list_user, categories, count });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};
exports.filter = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.body.page, 0) || 0,
            limit: parseInt(req.body.limit, 0) || 0
        }
        const list_user = await userModel.list.filter(req.body);
        for (item of list_user) {
            if (item.usn == req.session.authUser[0].usn)
                item.isEditable = false;
            else
                item.isEditable = true;
        }
        const n = list_user.length;
        var count = [];
        for (var i = 1; i <= Math.ceil(n / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        //console.log(list_user);

        const categories = [{ name: "Admin" }, { name: "User" }];
        res.render("users", { list_user, count, categories });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};