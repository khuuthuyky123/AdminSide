const db = require('../dal/mysql');

module.exports.list = {
    singleByUserName(entity) {
        const sql = "SELECT * FROM User WHERE id=" + entity.id;
        return db.load(sql);
    },
    edit(entity) {
        const sql = "UPDATE User SET ? WHERE ? ";
        const condition = { id: entity.id };
        return db.edit(sql, entity, condition);
    },
}