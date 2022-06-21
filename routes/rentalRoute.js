const rental = require("../controllers/rentalController");
// const cron = require('node-cron');

// cron.schedule('* * * * *', function() {
//     rental.testNodeCron();
// });

module.exports = function (app) {

    app.post("/rental", rental.addRental);
    app.post("/rentals/bulk", rental.addRentalByBulk);
    app.get("/rentals", rental.getAllRentals);
    app.get("/pagination", rental.getAllRentalsWithPagination);
    app.get("/rentals/:type", rental.getRentalsByType);
    app.get("/count/:type", rental.countRentalsByType);
    app.get("/available/:data", rental.countRentalsByAvailability);
    app.get("/total", rental.getTotalAvailable);
    app.get("/total/:type", rental.getTotalCountByType);
    app.get("/types", rental.getTypes);
    app.get("/total-counts", rental.getTotalCounts);

};
