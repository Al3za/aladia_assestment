/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_password_key" ON "Employee"("password");
