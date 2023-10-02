const express = require("express");
const invitationRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult} = require("express-validator");


// Create Invitation API
exports.create = async (req, res) => {
  try {
    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    id = req.user.id;
    
    const { name, email, phone, altEmail, organization } = req.body;

    let organizationId =null;

    if(organization){
      let organizationRecord = await prisma.organization.create({
        data: {
          name: organization.name,
          role: organization.role,
          validTill: new Date(organization.validTill),
        }
      });


      organizationId = organizationRecord.id

    }

    
    const invitationRecord = await prisma.invitation.create({
      data: {
        name,
        email,
        phone,
        altEmail,
        user:{
          connect:{
            id:2
          }
        },
        organization: organizationId
                      ? {
                          connect: {
                            id: organizationId
                          }
                        }
                      : undefined
      }
    });
    
    res.status(201).json({"message":"Your Invitation id is : "+invitationRecord.id});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// // Get Invitation by ID
// invitationRouter.get("/invitations/:id", async (req, res) => {
//   try {
//     const invitationId = parseInt(req.params.id);
//     const invitation = await prisma.invitation.findUnique({
//       where: { id: invitationId },
//     });

//     if (!invitation) {
//       return res.status(404).json({ error: "Invitation not found" });
//     }

//     res.json(invitation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Update Invitation by ID
// invitationRouter.put("/invitations/:id", async (req, res) => {
//   try {
//     const invitationId = parseInt(req.params.id);
//     const { name, email, phone, altEmail, organization } = req.body;

//     const updatedInvitation = await prisma.invitation.update({
//       where: { id: invitationId },
//       data: {
//         name,
//         email,
//         phone,
//         altEmail,
//         organization: {
//           update: organization, // Assuming 'organization' is an object containing updated organization details
//         },
//       },
//       include: {
//         organization: true,
//       },
//     });

//     res.json(updatedInvitation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
 
// // Delete Invitation by ID
// invitationRouter.delete("/invitations/:id", async (req, res) => {
//   try {
//     const invitationId = parseInt(req.params.id);

//     await prisma.invitation.delete({
//       where: { id: invitationId },
//     });

//     res.status(204).send(); // No content in the response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = invitationRouter;
