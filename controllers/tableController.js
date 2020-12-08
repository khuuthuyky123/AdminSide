const tableModel = require("../models/tableModel");
var formidable = require("formidable"); // used for parsing form data
var fs = require("fs");

exports.index = async function(req, res, next) {
    try {
        var pagination = { offset: 0, itemsPerPage: 0 };
        //console.log(req.body)
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            first_page = 1;
            pagination = { offset: 0, itemsPerPage: 10 };
        } else {
            pagination = req.body;
        }
        const categories = await tableModel.list.getCategories();
        //const list_product = await tableModel.list.all();

        //pass data to view display
        const list_product = await tableModel.list.get(pagination);
        const n = await tableModel.list.getAmount();
        var count = [];
        for (
            var i = 1; i <= Math.ceil(n[0].amount / pagination.itemsPerPage); i++
        ) {
            count.push({ ord: i });
        }
        //console.log(list_product);
        res.render("tables", { list_product, count, categories });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.edit = async function(req, res, next) {
    try {
        //console.log(product_name);
        const form = formidable({ multiples: false });
        form.parse(req, async function(err, fields, files) {
            if (err) {
                next(err);
                return;
            }
            //console.log({ fields, files });
            req.body = fields;
            const newPath = __dirname + '\\..\\public\\images\\' + files.imagePath.name;
            fs.renameSync(files.imagePath.path, newPath)
            req.body.imagePath = newPath;
            const ret = await tableModel.list.edit(req.body);
            //console.log(ret);
            res.redirect("/tables");
        });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.delete = async function(req, res, next) {
    try {
        //console.log(product_name);
        const ret = await tableModel.list.delete(req.body);
        console.log(ret);
        res.send("tables");
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.add = async function(req, res, next) {
    try {
        //console.log(product_name);
        const ret = await tableModel.list.add(req.body);
        console.log(ret);
        res.redirect("../tables");
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.search = async function(req, res, next) {
    try {
        const list_product = await tableModel.list.search(req.body);
        const n = list_product.length;
        var count = [];
        for (var i = 1; i <= Math.ceil(n / req.body.itemsPerPage); i++) {
            count.push({ ord: i });
        }
        //console.log(list_product);
        res.render("tables", { list_product, count });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};
exports.filter = async function(req, res, next) {
    try {
        const list_product = await tableModel.list.filter(req.body);
        const n = list_product.length;
        var count = [];
        for (var i = 1; i <= Math.ceil(n / req.body.itemsPerPage); i++) {
            count.push({ ord: i });
        }
        //console.log(list_product);

        const categories = await tableModel.list.getCategories();
        res.render("tables", { list_product, count, categories });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};