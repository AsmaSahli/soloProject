const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },

    addedBy:{
        type: String,
    },

    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },


}, { timestamps: true });






const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
