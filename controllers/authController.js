const { PrismaClientKnownRequestError, PrismaClientValidationError } = require("@prisma/client");

const { PrismaClient,Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config();
const prisma = new PrismaClient();
const { validationResult, header} = require("express-validator");
const jwt = require("jsonwebtoken")
const tokenManager = require("../utils/tokenManager");

// sign up API

exports.signup = async (req, res) => {
  try {

    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { invitaionId, password } = req.body;

    const salt = await bcrypt.genSalt(Number(process.env.HASH_ROUND));
    const hashPassword = await bcrypt.hash(password, salt);

    const invitationDetails = await prisma.invitation.findUnique({
      where: {
        id: invitaionId,
      },
    });

    if (!invitationDetails) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    const user = await prisma.user.create({
      data: {
        name: invitationDetails.name,
        email: invitationDetails.email,
        password: hashPassword,
        phone: invitationDetails.phone,
        alternateEmail: invitationDetails.altEmail,
        organizationId: invitationDetails.organizationId,
      },
    });

    res.status(201).json({message:"new user have been created with id= "+user.id});

  } 
  
  catch (error) {

    console.error(error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ error: "Validation error", details: error.message });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(500).json({message:'There is a unique constraint violation, a new user cannot be created with '+error.meta.target});
        }
    }
    res.status(500).json({ error: "Internal server error" });
  }

}

// genertate jwt token
function generateAccessToken(user) {
    return jwt.sign({name:user.name,id:user.id,email:user.email}, process.env.JWT_SECRET_KEY);
}


// login API

exports.login = async (req,res) => {

  try{
    //validate
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let refreshToken = req.header('Authorization') ? req.header('Authorization').split(" ")[1] : null;

    if(refreshToken!==null){
      return res.status(401).json({message:"Invalid Header paramaets, please remove the authorization header"});
    }


    const {email,password} = req.body;

    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if(!userDetails){
      return res.status(401).json({message:"Autentication Failed!!"});
    }

    let isUserValid = await bcrypt.compare(password, userDetails.password);

    if(isUserValid){
      const token = generateAccessToken(userDetails);

      await tokenManager.addToken(token,userDetails.id);

      return res.status(200).json({"Message":"user authenticated sucessfully","Token":token})

    }
    else{
      return res.status(401).json({message:"Autentication Failed!!"});
    }

  }
  catch(error){
    console.error(error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ error: "Validation error", details: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }

};

//logout API

exports.logout = async (req,res) => {
  try{
      //validate
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const token = req.header('Authorization').split(" ")[1];

      await tokenManager.destroy(token);
      
      return res.status(200).json({message:"Token Deleted"});
      
      
    }
    catch(error){
      console.error(error);
  
      res.status(500).json({ error: "Internal server error" });
    }
}