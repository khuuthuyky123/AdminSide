const db = require('../dal/mysql');

module.exports.list = {
    all() {
        const sql = "SELECT * FROM product";
        return db.load(sql);
    },
    edit(entity) {
        const sql = "UPDATE product SET ? WHERE ? ";
        const condition = { id: entity.id };
        return db.edit(sql, entity, condition);
    },

    delete(entity) {
        const sql = "DELETE FROM product WHERE ? ";
        const condition = { id: entity.id };
        return db.delete(sql, condition);
    },

    add(entity) {
        sql = "INSERT INTO product SET ?";
        return db.add(sql, entity);
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