const profileModel = require("../models/profileModel");
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
        const profileDetail = await profileModel.list.singleByUserName(
            req.session.authUser[0]
        );

        profileDetail[0].avtPath = cloudinary.url(profileDetail[0].avtPath, { width: 200, crop: "scale" })
        req.session.authUser[0] = profileDetail[0]
        res.render("user-profile", { profileDetail });
    } catch (err) {
        console.log(err);
        res.send("Check error on server 's console ");
    }
};

exports.edit = async function(req, res, next) {
    const form = formidable({ multiples: false });
    await form.parse(req, async function(err, fields, files) {
        try {
            if (err) {
                next(err);
                return;
            }
            //console.log({ fields, files });

            req.body = fields;
            if (files.avtPath.size != 0) {
                const oldImage = req.session.authUser[0].avtPath;
                const oldImagePath = oldImage.split(".");
                await cloudinary.uploader.destroy(
                    oldImagePath[0],
                    function(error, result) {
                        console.log(result, error);
                    }
                );
                await cloudinary.uploader.upload(
                    files.avtPath.path,
                    async function(error, result) {
                        //console.log(result)
                        if (err) {
                            throw err;
                        }
                        req.body.avtPath = result.public_id + "." + result.format;
                        const ret = await profileModel.list.edit(req.body);
                        res.redirect("/user-profile");
                    }
                );
            } else {
                const ret = await profileModel.list.edit(req.body);
                await res.redirect("/user-profile");
            }
        } catch (err) {
            console.log(err);
            res.send("Check error on server 's console ");
        }
    });
};