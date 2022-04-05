const prismaInstance = require("@prisma/client");
const PrismaClient = prismaInstance.PrismaClient;

const prisma = new PrismaClient();

async function get() {
  const [token] = await prisma.accessToken
    .findMany({
      orderBy: {
        id: "desc",
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return token;
}

async function save(data) {
  await prisma.accessToken
    .create({
      data: {
        value: data.access_token,
        expireDate: data["expire-date"],
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { get, save };
