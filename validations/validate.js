const {body} = require("express-validator");

// validation rules
exports.createInvitationValidation = [
  body("name").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("phone").notEmpty().isMobilePhone("any", { strictMode: false }),
  body("altEmail").optional().isEmail(),
  body("organization.name").if(body("organization").exists()).notEmpty().withMessage("Organization name is required"),
  body("organization.role").if(body("organization").exists()).notEmpty().withMessage("Organization role is required"),
  body("organization.validTill").if(body("organization").exists()).isISO8601().withMessage("Organization validTill is required"),
];

exports.createSignUpValidation = [
  body("invitaionId").notEmpty().isInt(),
  body("password").notEmpty().isStrongPassword().withMessage("Choose an Strong Password")
];

exports.createLoginValidation = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty()
];

exports.createUserEditValidation =[
  body("name").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("phone").notEmpty().isMobilePhone("any", { strictMode: false }),
  body("altEmail").optional().isEmail(),
  body("organization.name").if(body("organization").exists()).notEmpty().withMessage("Organization name is required"),
  body("organization.role").if(body("organization").exists()).notEmpty().withMessage("Organization role is required"),
  body("organization.validTill").if(body("organization").exists()).isISO8601().withMessage("Organization validTill is required"),
];