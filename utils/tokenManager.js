const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.checkToken = async (token) => {
  try {
    const existingToken = await prisma.aPITokens.findUnique({
      where: {
        token: token,
      },
    });


    if (existingToken) {
      return true;
    }

    return false;
  } 
  catch (error) {
    console.error(error);
    return false;
  }
};

exports.addToken = async (token,id) => {
  try {
    await prisma.aPITokens.create({
        data:{
            token:token,
            user:{
                connect:{
                  id:id
                }
            },
        }
    })

    console.log('Token added to the database.');
  } 
  catch (error) {
    console.error(error);
  }
};

exports.destroy = async (token) => {
  try {
    await prisma.aPITokens.delete({
      where: {
        token: token,
      },
    });

    console.log('Token removed from the database.');
  } catch (error) {
    console.error(error);
  }
};
