const userController = require("../controllers/UserController");


module.exports = (app) => {
    app.get("/user/:userId", userController.getOneUser);
    app.post("/signout", userController.signout);

};
