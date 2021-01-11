const db = require('../dal/mysql');

module.exports.list = {
    all() {
        const sql = "SELECT * FROM User ORDER BY id ASC";
        return db.load(sql);
    },
    get({ page, limit }) {
        const sql = "SELECT * FROM User ORDER BY id ASC LIMIT " + page * limit + "," + limit;
        return db.load(sql);
    },
    getAmount() {
        const sql = "SELECT COUNT(*) as amount FROM User";
        return db.load(sql);
    },
    search(entity, { page, limit }) {
        const sql = "SELECT * FROM User as u \
        WHERE (name LIKE '%" + entity.searchKeyWords + "%' \
        OR usn LIKE '%" + entity.searchKeyWords + "%' \
        OR email LIKE '%" + entity.searchKeyWords + "%') \
        AND (isAdmin=" + (entity.filterKeyWords == "Admin") + " OR " + (entity.filterKeyWords == "") + " ) ORDER BY id asc \
        LIMIT " + page * limit + "," + limit;
        return db.load(sql);
    },
    getSearchAmount(entity) {
        const sql = "SELECT COUNT(*) as amount FROM User as u \
        WHERE (name LIKE '%" + entity.searchKeyWords + "%' \
        OR usn LIKE '%" + entity.searchKeyWords + "%' \
        OR email LIKE '%" + entity.searchKeyWords + "%') \
        AND isAdmin=" + (entity.filterKeyWords == "Admin");
        return db.load(sql);
    },
    filter(entity) {
        const sql = "SELECT * FROM User WHERE isAdmin=" + (entity.filterKeyWords == "Admin") + " ORDER BY id ASC";
        return db.load(sql);
    },
    unblock(body) {
        const sql = "UPDATE User SET isActive=1 WHERE ?"
        const condition = { id: body.id }
        return db.edit(sql, condition);
    },
    block(body) {
        const sql = "UPDATE User SET isActive=0 WHERE ?"
        const condition = { id: body.id }
        return db.edit(sql, condition);
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