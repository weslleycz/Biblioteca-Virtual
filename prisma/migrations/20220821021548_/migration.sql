/*
  Warnings:

  - You are about to drop the column `sinceLoan` on the `Loans` table. All the data in the column will be lost.
  - Added the required column `statusLoan` to the `Loans` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "userId" TEXT NOT NULL,
    "statusLoan" TEXT NOT NULL,
    CONSTRAINT "Loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Loans" ("endDate", "id", "startDate", "userId") SELECT "endDate", "id", "startDate", "userId" FROM "Loans";
DROP TABLE "Loans";
ALTER TABLE "new_Loans" RENAME TO "Loans";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
