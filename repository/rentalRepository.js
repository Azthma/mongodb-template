const Rental = require("../models/rentalModel");

class rentalRepository {

    async insertOne(data) {
        let rental = await Rental.create(data);

        return rental;
    }

    async insertMany(data) {
        let rental = await Rental.insertMany(data);

        return rental;
    }

    async findAll() {
        let rental = await Rental.find({});

        return rental;
    }

    async findAllWithPagination(options) {
        let rental = await Rental.find({}).skip(parseInt(options.pageSize) * (parseInt(options.page) - 1)).limit(parseInt(options.pageSize));

        return rental;
    }

    async findByType(type) {
        let rental = await Rental.find({type});

        return rental;
    }

    async countByType(type) {
        let rental = await Rental.find({type}).count();

        return rental;
    }

    async countByAvailability(data) {
        let rental = await Rental.find({available: {$gt: data}}).count();

        return rental;
    }

    async totalAvailable() {
        let rental = await Rental.aggregate({ $group: { _id : null, total : { $sum: "$available" } } });

        return rental;
    }

    async totalCountByType(type) {
        let rental = await Rental.aggregate({$match: {type}},{ $group: { _id : null, total : { $sum: "$available" } } });

        return rental;
    }

    async totalAvailableByType(type) {
        let rental = await Rental.aggregate({$match: {type}},{ $group: { _id : null, total : { $sum: "$available" } } });

        return rental;
    }

    async getAllTypes() {
        let rental = await Rental.distinct("type");

        return rental;
    }

}

module.exports = new rentalRepository(Rental);
