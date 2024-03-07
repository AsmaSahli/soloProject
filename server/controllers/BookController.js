const Book = require("../models/Book");
const e = require("../utils/error");
module.exports = {
        addBook: async (req, res, next) => {
            try {
            const { content, title, userId ,addedBy } = req.body;
        
            if (userId !== req.user.id) {
                return next(
                e.errorHandler(403, 'You are not allowed to add a book')
                );
            }
            const potentialBook=await Book.findOne({title:req.body.title})
            if(potentialBook){
                next(e.errorHandler(400, 'Book already exists'))
            }
        
            const newBook = new Book({
                title,
                userId,
                content,
                addedBy

            });
            await newBook.save();
        
            res.status(200).json(newBook);
            } catch (error) {
            next(error);
            }
        },
        getAllBooks: async (req, res, next) => {
            try {
                const books = await Book.find();
                res.status(200).json(books);
            } catch (error) {
                next(error);
            }
        },
        getOneBook: async (req, res, next) => {
            try {
                const { bookId } = req.params;
                const book = await Book.findById(bookId);
                if (!book) {
                    return next(
                        e.errorHandler(404, 'Book not found')
                    );
                }
                res.status(200).json(book);
            } catch (error) {
                next(error);
            }
        },
        // updateBook: async (req, res, next) => {
        //     try {
        //         const { bookId } = req.params;
        //         const { title, content } = req.body;
    
        //         const book = await Book.findById(bookId);
        //         if (!book) {
        //             return next(
        //                 e.errorHandler(404, 'Book not found')
        //             );
        //         }

        //         if (book.userId !== req.user.id) {
        //             return next(
        //                 e.errorHandler(403, 'You are not allowed to update this book')
        //             );
        //         }
    
        //         book.title = title || book.title;
        //         book.content = content || book.content;
    
        //         await book.save();
    
        //         res.status(200).json(book);
        //     } catch (error) {
        //         next(error);
        //     }
        // },

        updateBook : async (req, res, next) => {
            const { bookId } = req.params;
            const book = await Book.findById(bookId);
            if (!book) {
                return next(
                    e.errorHandler(404, 'Book not found')
                );
            }
            if (book.userId !== req.user.id) {
                return next(
                    e.errorHandler(403, 'You are not allowed to update this book')
                );
            }
                try {
                const updatedBook = await Book.findByIdAndUpdate(
                    req.params.bookId,
                    {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        likes: req.body.likes,
                        numberOfLikes: req.body.numberOfLikes,
                    },
                    },
                    { new: true }
                );
                res.status(200).json(updatedBook);
                } catch (error) {
                next(error);
                }

            },
        updatelikes : async (req, res, next) => {
            const { bookId } = req.params;
            const book = await Book.findById(bookId);
            if (!book) {
                return next(
                    e.errorHandler(404, 'Book not found')
                );
            }
                try {
                const updatedBook = await Book.findByIdAndUpdate(
                    req.params.bookId,
                    {
                    $set: {
                        likes: req.body.likes,
                        numberOfLikes: req.body.numberOfLikes,
                    },
                    },
                    { new: true }
                );
                res.status(200).json(updatedBook);
                } catch (error) {
                next(error);
                }

            }



}