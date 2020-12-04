const tableModel = require('../models/tableModel');


exports.index = async function(req, res, next) {
    try {
        const list_product = await tableModel.list.all();
        console.log(list_product);
        //pass data to view display 
        res.render('tables', { list_product });
    } catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }
}

exports.edit = async function(req, res, next) {
    try {

        //console.log(product_name);
        const ret = await tableModel.list.edit(req.body);
        console.log(ret);
        res.redirect('tables');
    } catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }
}

exports.delete = async function(req, res, next) {
    try {

        //console.log(product_name);
        const ret = await tableModel.list.delete(req.body);
        console.log(ret);
        res.send('tables');
    } catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }
}

exports.add = async function(req, res, next) {
    try {

        //console.log(product_name);
        const ret = await tableModel.list.add(req.body);
        console.log(ret);
        res.redirect('../tables');
    } catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }
}