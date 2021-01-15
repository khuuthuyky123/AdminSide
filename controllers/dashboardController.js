const dashboardModel = require("../models/dashboardModel");

exports.index = async function(req, res, next) {
    try {
        if (!(
                req.session.isAuth === null ||
                req.session.isAuth == false ||
                typeof req.session.isAuth === "undefined"
            )) {
            var revenue = await dashboardModel.list.getRevenueByDate();
            var count = 1;
            var row = [];
            for (item of revenue) {
                item.id = count;
                count += 1;
                row.push({ y: item.date, a: item.money });
            }

            res.render("index", { revenue });
        }
    } catch (err) {
        console.log(err);
        return res.send("Check error on server 's console ");
    }
};

exports.dataBar = async function(req, res, next) {
    try {
        var revenue;
        var count = 1;
        var row = [];
        switch (req.body.type) {
            case "Date":
                {
                    revenue = await dashboardModel.list.getRevenueByDate();
                    break;
                }
            case "Week":
                {
                    revenue = await dashboardModel.list.getRevenueByWeek();
                    break;
                }
            case "Month":
                {
                    revenue = await dashboardModel.list.getRevenueByMonth();
                    break;
                }
            case "Quarter":
                {
                    revenue = await dashboardModel.list.getRevenueByQuarter();
                    break;
                }
            case "Year":
                {
                    revenue = await dashboardModel.list.getRevenueByYear();
                    break;
                }
            default:
                revenue = await dashboardModel.list.getRevenueByDate();
        }

        for (item of revenue) {
            item.id = count;
            count += 1;
            row.push({ y: item.date, a: item.money });
        }

        res.json(row);
    } catch (err) {
        console.log(err);
        return res.send("Check error on server 's console ");
    }
};

exports.dataDonut = async function(req, res, next) {
    try {
        var revenue = await dashboardModel.list.getTopProduct();
        var data = revenue;

        res.json(data);
    } catch (err) {
        console.log(err);
        return res.send("Check error on server 's console ");
    }
};