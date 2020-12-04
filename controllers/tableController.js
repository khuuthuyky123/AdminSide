const tableModel = require('../models/tableModel');


exports.index = async function(req, res, next) {
    try {
        const list_product = await tableModel.list.all();
        console.log(list_product);
        //pass data to view display 
        res.render('tables', { list_product });
    } catch (err) {
        console.log(err);
    }
}