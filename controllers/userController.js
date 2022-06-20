const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

class userController {
    constructor() { }

    async addUser(req, res, next) {
        try {
            const { ...defaults } = req.body;
            const findUser = await userRepository.findByEmail(defaults.email);
            if (!findUser) {
                const hash = bcrypt.hashSync(defaults.password, 10);
                defaults.password = hash;
                const user = await userRepository.insertOne(defaults);
                res.json(user);
            } else {
                return res.json({
                    message: "email is already in use."
                });
            }
        } catch (error) {
            return res.json(error)
        }
    }

    async login(req, res, next) {
        try {
            const { ...defaults } = req.body;
            const findUser = await userRepository.findByEmail(defaults.email);
        
            if (!!findUser) {
                const checkPassword = await bcrypt.compare(defaults.password, findUser.password);
        
                if (checkPassword) {
                    let token = jwt.sign(
                        {
                            id: findUser.id,
                            email: findUser.email,
                            exp: Math.floor(Date.now() / 1000) + 60 * (60 * 24),
                        },
                        process.env.JWT_SECRET
                    );
                    return res.json({
                        success: true,
                        user: {
                            id: findUser.id,
                            name: findUser.name,
                            email: findUser.email,
                            birthdate: findUser.birthdate,
                            address: findUser.address,
                            token,
                            exp: Math.floor(Date.now() / 1000) + 60 * (60 * 24),
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        error: 'incorrect password'
                    });
                }
            } else {
                return res.json({
                    success: false,
                    error: 'invalid email'
                });
            }
        } catch (error) {
            return res.json(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userRepository.findAll();
            return res.json(users);
        } catch (error) {
            return res.json(error)
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await userRepository.findById(req.params.id);
            if (!!user) {
                return res.json(user);
            } else {
                return res.json({message: "no data found"});
            }
        } catch (error) {
            return res.json(error)
        }
    }

    async getUserByEmail(req, res, next) {
        try {
            const { ...defaults } = req.body;
            const user = await userRepository.findByEmail(defaults.email);

            return res.json(user);
        } catch (error) {
            return res.json(error)
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userRepository.findById(req.params.id);
            if (!!user) {
                const { ...defaults } = req.body;
                const update = await userRepository.updateById(req.params.id, defaults);

                return res.json({updated: !!update});
            } else {
                return res.json({message: "no data found"});
            }
        } catch (error) {
            return res.json(error)
        }
    }

    async removeUser(req, res, next) {
        try {
            const user = await userRepository.findById(req.params.id);
            if (!!user) {
                const deleted = await userRepository.deleteById(req.params.id);
                
                return res.json({deleted: !!deleted});
            } else {
                return res.json({message: "no data found"});
            }
        } catch (error) {
            return res.json(error)
        }
    }

}

const user = new userController();

module.exports = user;
