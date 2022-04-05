const prismaInstance = require("@prisma/client");
const PrismaClient = prismaInstance.PrismaClient;

const prisma = new PrismaClient();

async function getAll() {
  return await prisma.location
    .findMany()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function save(data) {
  const owners = [];

  if (Array.isArray(data.fimOwner)) {
    data.fimOwner.map((owner) =>
      owners.push(`${owner.firstName} ${owner.lastName}`)
    );
  } else {
    owners.push(`${data.fimOwner.firstName} ${data.fimOwner.lastName}`);
  }

  return await prisma.location
    .create({
      data: {
        name: data.centerName,
        phoneNumber: data.storePhone,
        email: data.storeEmail,
        ownersNames: owners,
        city: data.city,
        state: data.state,
        officeRank: "",
        regionalDirector: "",
        address: data.address,
        joinDate: new Date(data.openingDate),
        website: data.storeWebsite,
        referenceId: data.referenceId,
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
  return await prisma.location
    .deleteMany({})
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { getAll, save, deleteAll };
