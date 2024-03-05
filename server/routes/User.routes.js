const userController = require("../controllers/UserController");


module.exports = (app) => {
    app.post("/signout", userController.signout);
    app.patch('/update/:userId',userController.updateUser)
    app.delete('/delete/:userId', userController.deleteUser);
    app.get('/getusers', userController.getUsers);
    app.get('/:userId', userController.getUser);
};
