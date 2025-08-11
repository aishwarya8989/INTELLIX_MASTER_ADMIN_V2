-- CreateTable
CREATE TABLE "InstAdmin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "instituteId" INTEGER NOT NULL,

    CONSTRAINT "InstAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstAdmin_email_key" ON "InstAdmin"("email");

-- AddForeignKey
ALTER TABLE "InstAdmin" ADD CONSTRAINT "InstAdmin_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
