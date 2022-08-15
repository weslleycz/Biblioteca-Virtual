/*
  Warnings:

  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ADM" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registration" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "pendency" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Users" ("category", "email", "id", "name", "pendency", "registration", "telephone") SELECT "category", "email", "id", "name", "pendency", "registration", "telephone" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE TABLE "new_Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ISBN" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "cover" TEXT,
    "loanId" TEXT,
    "aDMId" TEXT,
    CONSTRAINT "Books_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loans" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Books_aDMId_fkey" FOREIGN KEY ("aDMId") REFERENCES "ADM" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Books" ("ISBN", "author", "cover", "id", "loanId", "title", "year") SELECT "ISBN", "author", "cover", "id", "loanId", "title", "year" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
CREATE UNIQUE INDEX "Books_ISBN_key" ON "Books"("ISBN");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ADM_email_key" ON "ADM"("email");
