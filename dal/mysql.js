const mysql = require('mysql');
const util = require('util');
const { edit } = require('../controllers/tableController');

const pool = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12380248',
    password: 'DzQxPaZiPG',
    database: 'sql12380248',
    port: 3306,
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
    },

    edit(sql, entity, condition) {
        return pool_query(sql, [entity, condition]);
    },
    delete(sql, condition) {
        return pool_query(sql, condition);
    },
    add(sql, entity) {
        return pool_query(sql, entity);
    }
};