const db = require('../dal/mysql');

module.exports.list = {
    all() {
        const sql = "SELECT * FROM User ORDER BY id ASC";
        return db.load(sql);
    },
    singleByUserName({ name }) {
        const sql = "SELECT * FROM User WHERE usn LIKE '" + name + "' OR email LIKE '" + name + "'";
        return db.load(sql);
    }
}