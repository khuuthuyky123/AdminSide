const db = require('../dal/mysql');

module.exports.list = {
    all() {
        const sql = "SELECT * FROM Product";
        return db.load(sql);
    },
    get({ offset, itemsPerPage }) {
        const sql = "SELECT * FROM Product LIMIT " + offset + "," + itemsPerPage;
        return db.load(sql);

    },
    edit(entity) {
        const sql = "UPDATE Product SET ? WHERE ? ";
        const condition = { id: entity.id };
        return db.edit(sql, entity, condition);
    },

    delete(entity) {
        const sql = "DELETE FROM Product WHERE ? ";
        const condition = { id: entity.id };
        return db.delete(sql, condition);
    },

    add(entity) {
        const sql = "INSERT INTO Product SET ?";
        return db.add(sql, entity);
    },
    getAmount() {
        const sql = "SELECT COUNT(*) as amount FROM Product";
        return db.load(sql);
    },
    search(entity) {
        const sql = "SELECT * FROM Product WHERE name LIKE '%" + entity.keyWords + "%' OR description LIKE '%" + entity.keyWords + "%'";
        return db.load(sql);
    },
    getCategories() {
        const sql = "SELECT * FROM Category"
        return db.load(sql);
    },
    filter(entity) {
        const sql = "SELECT p.* FROM category as c JOIN product as p ON c.id=p.categoryId WHERE c.name LIKE '" + entity.keyWords + "'";
        return db.load(sql);
    }
};







// async function a() {
//     try {
//         const sql = "SELECT * FROM product";
//         const rows = await db.load(sql);
//         console.log(rows);
//     } catch (err) {
//         console.log(err);
//     }
// const render_fn = function(rows) {
//         console.log(rows);
//     }
// conn.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     console.log('model db');
//     //const booksCollection = db[1].id;
//     const list_product = result;
//     return list_product;
// });
// const p = db.load(sql);
// p.then(
//         function(rows) { console.log(rows); }
//     )
//     .catch(
//         function(err) {
//             console.log(err);
//         }
//     );
// }