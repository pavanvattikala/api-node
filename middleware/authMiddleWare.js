const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenManager =  require("../utils/tokenManager");

const authenticate = async (req,res,next) => {

    const token = req.header('Authorization').split(" ")[1];

    if(!token){
        return res.status(401).json({message:"No token has been passed"});
    }
    const existingToken = await tokenManager.checkToken(token);
    console.log(existingToken);
    if(!existingToken){
        return res.status(401).json({message:"Invalid Token passed / No Such Token Found"});
    }
    

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,result) => {

        if(err){
            console.log("Invalid Token");
            return res.status(401).json({message:"Invalid Token"});
        }
        
        req.user = result;

        next();

    });


};

module.exports = authenticate;