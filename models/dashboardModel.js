const db = require('../dal/mysql');

module.exports.list = {
    getRevenueByDate() {
        const sql = "SELECT DATE_FORMAT(f.date,'%d/%m/%Y') as date, CONCAT(FORMAT(SUM(f.money),0),' VND') as money \
                    FROM (SELECT DATE(createDate) as date, totalPrice as money FROM Cart) as f \
                    GROUP BY f.date \
                    ORDER BY DATE_FORMAT(f.date,'%d/%m/%Y') ASC";
        return db.load(sql);
    },
    getRevenueByMonth() {
        const sql = "SELECT DATE_FORMAT(f.createDate,'%m/%Y') as date, CONCAT(FORMAT(SUM(f.money),0),' VND ') as money FROM (SELECT createDate, totalPrice as money FROM Cart) as f GROUP BY DATE_FORMAT(f.createDate,'%m/%Y') ORDER BY YEAR(f.createDate) ASC, MONTH(f.createDate) ASC";
        return db.load(sql);
    },
    getRevenueByYear() {
        const sql = "SELECT f.date as date, CONCAT(FORMAT(SUM(f.money),0),' VND') as money \
                    FROM (SELECT Year(createDate) as date, totalPrice as money FROM Cart) as f \
                    GROUP BY f.date \
                    ORDER BY f.date ASC";
        return db.load(sql);
    },
    getRevenueByWeek() {
        const sql = "SELECT CONCAT(DATE_FORMAT(SUBDATE(f.createDate, WEEKDAY(f.createDate)),'%d/%m/%Y'),' - ',DATE_FORMAT(ADDDATE(f.createDate,7),'%d/%m/%Y')) as date, CONCAT(FORMAT(SUM(f.money),0),' VND') as money FROM (SELECT createDate, WEEK(createDate) as date, totalPrice as money FROM Cart ) as f GROUP BY f.date ORDER BY YEAR(f.createDate) ASC, WEEK(f.createDate) ASC";
        return db.load(sql);
    },
    getRevenueByQuarter() {
        const sql = "SELECT CONCAT(quarter(f.createDate),'/',year(f.createDate)) as date , CONCAT(FORMAT(SUM(f.money),0),' VND') as money FROM (SELECT createDate, totalPrice as money FROM Cart) as f GROUP BY year(f.createDate),quarter(f.createDate) ORDER BY YEAR(f.createDate) ASC, quarter(f.createDate) ASC";
        return db.load(sql);
    },
    getTopProduct() {
        const sql = "SELECT p.name as label, SUM(i.amount) as value FROM ItemInCart as i JOIN Product as p ON i.itemId = p.id GROUP BY i.itemid ORDER BY SUM(i.amount) DESC LIMIT 0,10"
        return db.load(sql);
    }
}