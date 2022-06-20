const user = require("../controllers/userController");

module.exports = function (app) {

    app.post("/users", user.addUser);
    app.post("/login", user.login);
    app.get("/users", user.getAllUsers);
    app.get("/users/email", user.getUserByEmail);
    app.get("/user/:id", user.getUser);
    app.put("/user/:id", user.updateUser);
    app.delete("/user/:id", user.removeUser);

};
