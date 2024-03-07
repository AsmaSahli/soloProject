const User=require("../models/User");
const bcrypt = require("bcrypt");
const e = require("../utils/error");

module.exports={

    
    signout :(req, res, next) => {
        try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out');
        } catch (error) {
        next(error);
        }
    },
    getOneUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if (!user) {
                return next(
                    e.errorHandler(404, 'User not found')
                );
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },








    
    
}