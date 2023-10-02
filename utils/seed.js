const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
require("dotenv").config();
const prisma = new PrismaClient();

async function main() {
  const password = 'admin@ieee';
  const salt = await bcrypt.genSalt(Number(process.env.HASH_ROUND));
  const hashPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
        name:"admin",
        email: 'admin@ieee.org',
        password: hashPassword,
        phone:"123456789"
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
