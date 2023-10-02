const { validationResult } = require('express-validator');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

exports.edit = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { name, email, phone, alternateEmail, profilePicture, organization } = req.body;

      const organizationDetails = await prisma.user.findUnique({
          where: {
              id: userId
          },
          select: {
              organizationId: true
          }
      });

      console.log(organizationDetails.organizationId);
      let organizationRecord =null;

      if(organizationDetails.organizationId!=null && organization){
          organizationRecord = await prisma.organization.update({
              where: {
                  id: organizationDetails.organizationId
              },
              data: {
                  name: organization.name,
                  role: organization.role,
                  validTill: new Date(organization.validTill),
              },
          });
      }
      else {
        organizationRecord = await prisma.organization.create({
            data: {
                name: organization.name,
                role: organization.role,
                validTill: new Date(organization.validTill),
            }
        });
      }

      // Check for duplicate email or phone
      const existingUserWithEmail = await prisma.user.findFirst({ where: { email: email, NOT: { id: userId } } });
      const existingUserWithPhone = await prisma.user.findFirst({ where: { phone: phone, NOT: { id: userId } } });

      if (existingUserWithEmail) {
          return res.status(400).json({ error: 'Email is already in use' });
      }

      if (existingUserWithPhone) {
          return res.status(400).json({ error: 'Phone number is already in use' });
      }

      // Update user information in the database
      const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
              name,
              email,
              phone,
              alternateEmail,
              profilePicture,
              organizationId: organizationRecord?.id || organizationId,
          },
      });

        res.status(200).json({message:"User Updated Sucessfully"});
    } catch (error) {
        console.error(error);

        // Handle specific Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: 'Prisma error', details: error.meta });
        }

        // Handle other errors
        res.status(500).json({ error: 'Internal server error' });
    }
};
