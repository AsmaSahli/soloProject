const User = require("../models/User");
const bcrypt = require("bcrypt");
const e = require("../utils/error");
const jwt=require("jsonwebtoken")
module.exports = {

    signup: async (req, res, next) => {
            const { firstName,lastName, email, password,confirmPassword } = req.body;
        
            if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""

            ) {
            next(e.errorHandler(400, 'All Fields Are Required'));
            }
            if (req.body.password) {
                if (req.body.password.length < 6) {
                    return next(e.errorHandler(400, 'Password must be at least 6 characters'));
                }}
            const potentialUser=await User.findOne({email:req.body.email})
            if(potentialUser){
                next(e.errorHandler(400, 'User already registered'))
            }
            if (
                password !==confirmPassword
            ){
                next(e.errorHandler(400, 'Password and Confirm Password must match !'))
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
            });
        
            try {
            await newUser.save();
            res.json("Signup successful");
            } catch (error) {
            next(error);
            }
        },

        




}