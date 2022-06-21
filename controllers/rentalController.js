const rentalRepository = require("../repository/rentalRepository");

class rentalController {
    constructor() { }

    async addRental(req, res) {
        const {...defaults} = req.body;
        try {
            const rental = await rentalRepository.insertOne(defaults);
            return res.json(rental);
        } catch (error) {
            return res.json(error);
        }
    }

    async addRentalByBulk(req, res) {
        const defaults = {};
        defaults.data = req.body;
        try {
            const rental = await rentalRepository.insertMany(defaults.data);
            return res.json(rental);
        } catch (error) {
            return res.json(error);
        }
    }

    async getAllRentals(req, res) {
        try {
            const rentals = await rentalRepository.findAll();
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async getAllRentalsWithPagination(req, res) {
        try {
            let options = {
                page: req.query.page || 1,
                pageSize: req.query.pageSize || 5,
            }
            const rentals = await rentalRepository.findAllWithPagination(options);
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async getRentalsByType(req, res) {
        try {
            const rentals = await rentalRepository.findByType(req.params.type);
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async countRentalsByType(req, res) {
        try {
            const rentals = await rentalRepository.countByType(req.params.type);
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async countRentalsByAvailability(req, res) {
        try {
            const rentals = await rentalRepository.countByAvailability(req.params.data);
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async getTotalAvailable(req, res) {
        try {
            const rentals = await rentalRepository.totalAvailable();
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async getTotalCountByType(req, res) {
        try {
            const rentals = await rentalRepository.totalCountByType(req.params.type);
            return res.json(rentals);
        } catch (error) {
            return res.json(error);
        }
    }

    async getTypes(req, res) {
        try {
            const types = await rentalRepository.getAllTypes();
            return res.json(types);
        } catch (error) {
            return res.json(error);
        }
    }

    async getTotalCounts(req, res) {
        try {
            const types = await rentalRepository.getAllTypes();
            let total = types.map(async (data) => {
                let count = await rentalRepository.countByType(data);
                let available = await rentalRepository.totalAvailableByType(data);
                return {
                    type: data,
                    count: count,
                    total: parseInt(available.map((data)=>data.total))
                }
            })
            const overall = await rentalRepository.totalAvailable();
            const data = await Promise.all(total);
            return res.json({
                overall: parseInt(overall.map((data)=>data.total)),
                data: data
            });
        } catch (error) {
            return res.json(error);
        }
    }

    async testNodeCron(req, res) {
        console.log("1 minute has passed")
    }

}

const rental = new rentalController();

module.exports = rental;
