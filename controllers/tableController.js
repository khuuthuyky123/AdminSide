const tableModel = require("../models/tableModel");
var formidable = require("formidable"); // used for parsing form data
var fs = require("fs");
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'kylecloudy',
    api_key: '117882282768667',
    api_secret: 'PMJ0PmowbNRSyPJCQM6HVtSSAgA'
});

exports.index = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 0) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
        }
        if (req.query.constructor === Object && Object.keys(req.query).length === 0) {
            res.redirect("/tables/?page=0&limit=10")
        }
        //var pagination = { offset: 0, itemsPerPage: 0 };
        //console.log(req.body)
        // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        //     first_page = 1;
        //     pagination = { offset: 0, itemsPerPage: 10 };
        // } else {
        //     pagination = req.body;
        // }
        const categories = await tableModel.list.getCategories();
        //const list_product = await tableModel.list.all();

        //pass data to view display
        const list_product = await tableModel.list.get(pageOptions);
        for (item of list_product) {
            //item.imagePath = cloudinary.url(item.imagePath);
            item.imagePath = cloudinary.url(item.imagePath, { width: 200, crop: "scale" })
        }
        const n = await tableModel.list.getAmount();
        var count = [];
        for (var i = 1; i <= Math.ceil(n[0].amount / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        //console.log(count);
        res.render("tables", { list_product, count, categories });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.edit = function(req, res, next) {
    //console.log(product_name);
    //console.log(req.query);
    const form = formidable({ multiples: false });
    form.parse(req, async function(err, fields, files) {
        try {
            if (err) {
                next(err);
                return;
            }
            //console.log({ fields, files });

            req.body = fields;
            if (files.newImagePath.size != 0) {
                //var tokens = String(files.newImagePath.path).split("\\");
                //var newPath = String(files.newImagePath.path).replace(tokens[tokens.length - 1], files.newImagePath.name);
                //fs.renameSync(files.newImagePath.path, newPath);
                const curProduct = await tableModel.list.getSingleProduct(req.body.id);
                const oldImage = curProduct[0].imagePath;
                const oldImagePath = oldImage.split(".");
                await cloudinary.uploader.destroy(oldImagePath[0], function(error, result) {
                    console.log(result, error)
                });
                await cloudinary.uploader.upload(files.newImagePath.path, async function(error, result) {
                    //console.log(result)
                    if (err) {
                        throw err;
                    }
                    req.body.imagePath = result.public_id + "." + result.format;
                    const ret = await tableModel.list.edit(req.body);
                    //console.log(ret);
                    res.redirect("/tables");
                });
            } else {
                const ret = await tableModel.list.edit(req.body);
                //console.log(ret);
                res.redirect("/tables");
            }
            //const newPath = __dirname + "/../public/images/" + files.newImagePath.name;
            //fs.renameSync(files.newImagePath.path, newPath);
            //req.body.imagePath = "/images/" + files.newImagePath.name;
        } catch (err) {
            console.log(err);
            res.send("Check error on server 's console ");
        }
    });
};

exports.delete = async function(req, res, next) {
    try {
        //console.log(product_name);
        const curProduct = await tableModel.list.getSingleProduct(req.body.id);
        const oldImage = curProduct[0].imagePath;
        const oldImagePath = oldImage.split(".");
        await cloudinary.uploader.destroy(oldImagePath[0], function(error, result) {
            console.log(result, error)
        });
        const ret = await tableModel.list.delete(req.body);
        console.log(ret);
        res.send("/tables");
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.add = async function(req, res, next) {
    const form = formidable({ multiples: false });
    form.parse(req, async function(err, fields, files) {
        try {
            if (err) {
                next(err);
                return;
            }
            //console.log({ fields, files });
            req.body = fields;
            if (files.imagePath.size != 0) {
                //var tokens = String(files.imagePath.path).split("\\");
                //var newPath = String(files.imagePath.path).replace(tokens[tokens.length - 1], files.imagePath.name);
                //fs.renameSync(files.imagePath.path, newPath);
                cloudinary.uploader.upload(files.imagePath.path, async function(error, result) {
                    //console.log(result)
                    req.body.imagePath = result.public_id + "." + result.format;
                    const ret = await tableModel.list.add(req.body);
                    console.log(ret);
                    res.redirect("/tables");
                });
            }
        } catch (err) {
            console.log(err);
            res.send("Check error on server 's console ");
        }
    });
};

exports.search = async function(req, res, next) {
    try {
        const pageOptions = {
            page: parseInt(req.body.page, 0) || 0,
            limit: parseInt(req.body.limit, 0) || 10
        }
        const categories = await tableModel.list.getCategories();
        const list_product = await tableModel.list.search(req.body, pageOptions);
        const n = await tableModel.list.getSearchAmount(req.body);
        for (item of list_product) {
            item.imagePath = cloudinary.url(item.imagePath, { width: 200, crop: "scale" })
        }
        var count = [];
        for (var i = 1; i <= Math.ceil(n[0].amount / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        res.render("tables", { list_product, categories, count });
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
        const list_product = await tableModel.list.filter(req.body);
        for (item of list_product) {
            item.imagePath = cloudinary.url(item.imagePath, { width: 200, crop: "scale" })
        }
        const n = list_product.length;
        var count = [];
        for (var i = 1; i <= Math.ceil(n / pageOptions.limit); i++) {
            count.push({ ord: i, isfirst: (i == pageOptions.page + 1) });
        }
        //console.log(list_product);

        const categories = await tableModel.list.getCategories();
        res.render("tables", { list_product, count, categories });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};