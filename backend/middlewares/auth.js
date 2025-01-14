const user = require('../db/users/users')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token)
        if (!token) {
            throw new Error('Token not found');
        }
        
        const verifyUser = jwt.verify(token, process.env.SERCET_KEY);
        console.log(verifyUser)
        const presentUser = await user.findOne({ _id: verifyUser._id });
        if (!presentUser) {
            throw new Error('User not found');
        }
        req.user = presentUser
        
        console.log("You are a valid User");
        
        next(); 
    } catch (err) {
        console.log("You are not a valid user to access");
        res.status(401).redirect('/login');
    }
};

module.exports = auth