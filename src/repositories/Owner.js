const prismaInstance = require("@prisma/client");
const PrismaClient = prismaInstance.PrismaClient;

const prisma = new PrismaClient();

async function getAll() {
  return await prisma.owner
    .findMany()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function save(data, referenceId) {
  return await prisma.owner
    .create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        salesRank: "",
        phone: data.mobile,
        email: data.email,
        locations: [+referenceId],
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function deleteAll() {
  return await prisma.owner
    .deleteMany({})
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { getAll, save, deleteAll };
