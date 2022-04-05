-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ownersNames" TEXT[],
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "officeRank" TEXT NOT NULL,
    "regionalDirector" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
