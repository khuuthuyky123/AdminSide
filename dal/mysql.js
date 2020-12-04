const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'zxcvb12345!@#$%',
    database: 'product_list',
    connectionLimit: 50
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load(sql) {
        return pool_query(sql);
        // return new Promise(
        //     function(done, fail) {
        //         connection.connect(function(err) {
        //             if (err) throw err;
        //             else
        //                 console.log('CONNECTED');
        //         });

        //         connection.query(sql, function(err, results, fields) {
        //             if (err)
        //                 fail(err);
        //             else
        //                 done(results);

        //         });
        //         connection.end();
        //     }
        // )
    }
};