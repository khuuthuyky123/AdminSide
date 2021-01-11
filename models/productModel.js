const db = require('../dal/mysql');

module.exports.list = {
    all() {
        const sql = "SELECT * FROM Product ORDER BY id ASC";
        return db.load(sql);
    },
    get({ page, limit }) {
        const sql = "SELECT p.*, c.id as categoryId, c.name as category FROM (Product as p JOIN Category as c ON (p.categoryId = c.id)) ORDER BY id ASC LIMIT " + page * limit + "," + limit;
        return db.load(sql);

    },
    getSingleProduct(id) {
        const sql = "SELECT * FROM Product WHERE id = " + id;
        return db.load(sql);
    },
    edit(entity) {
        const sql = "UPDATE Product SET ? WHERE ? ";
        const condition = { id: entity.id };
        return db.edit(sql, entity, condition);
    },

    delete(entity) {
        const sql1 = "DELETE FROM Specification WHERE ?";
        const sql2 = "DELETE FROM Product WHERE ?";
        const condition1 = { productID: entity.id };
        const condition2 = { id: entity.id };
        db.delete(sql1, condition1);
        return db.delete(sql2, condition2);
    },

    add(entity) {
        const sql = "INSERT INTO Product SET ?";
        return db.add(sql, entity);
    },
    getAmount() {
        const sql = "SELECT COUNT(*) as amount FROM Product";
        return db.load(sql);
    },
    search(entity, { page, limit }) {
        const sql = "SELECT p.* FROM Category as c \
JOIN (SELECT * FROM Product WHERE name LIKE '%" + entity.searchKeyWords + "%' OR description LIKE '%" + entity.searchKeyWords + "%') as p \
ON c.id=p.categoryId WHERE c.name LIKE '%" + entity.filterKeyWords + "%' \
ORDER BY p.id asc \
LIMIT " + page * limit + "," + limit;
        return db.load(sql);
    },
    getSearchAmount(entity) {
        const sql = "SELECT COUNT(*) as amount FROM Category as c \
        JOIN (SELECT * FROM Product WHERE name LIKE '%" + entity.searchKeyWords + "%' OR description LIKE '%" + entity.searchKeyWords + "%') as p \
        ON c.id=p.categoryId WHERE c.name LIKE '%" + entity.filterKeyWords + "%'";
        return db.load(sql);
    },
    getCategories() {
        const sql = "SELECT * FROM Category"
        return db.load(sql);
    },
    filter(entity) {
        const sql = "SELECT p.* FROM Category as c JOIN Product as p ON c.id=p.categoryId WHERE c.name LIKE '%" + entity.filterKeyWords + "%' ORDER BY id ASC";
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