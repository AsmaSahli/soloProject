const bookController = require("../controllers/BookController");
const verifyToken =require("../utils/verifyUser")

module.exports = (app) => {
    app.get('/getAllBooks',bookController.getAllBooks)
    app.get('/getOneBook/:bookId',bookController.getOneBook)
    app.post('/addBook',verifyToken.verifyToken,bookController.addBook)
    app.patch('/updateBook/:bookId',verifyToken.verifyToken,bookController.updateBook)
    app.patch('/updatelikes/:bookId',bookController.updatelikes)

};
