const db = require('../dal/mysql');

module.exports.list = {
    singleByUserName({ name }) {
        const sql = "SELECT * FROM User WHERE usn LIKE '" + name + "' OR email LIKE '" + name + "'";
        return db.load(sql);
    }
}