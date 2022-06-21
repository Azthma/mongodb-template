const User = require("../models/userModel");

class UserRepository {
    async create(data) {
        let user = await User.create(data);

        return user;
    }

    async findAll() {
        let users = await User.find({})

        return users;
    }

    async findById(id) {
        let user = await User.findById(id);
        
        return user;
    }

    async findByEmail(email) {
        let user = await User.findOne({ email });
        
        return user;
    }

    async updateById(_id, data) {
        let user = await User.update({_id}, data, {upsert: true});

        return user;
    }

    async deleteById(_id) {
        let user = await User.remove({_id});

        return user;
    }
}

module.exports = new UserRepository(User);
