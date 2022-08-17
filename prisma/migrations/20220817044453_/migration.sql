-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ISBN" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "cover" TEXT,
    "loanId" TEXT,
    "aDMId" TEXT,
    CONSTRAINT "Books_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loans" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Books_aDMId_fkey" FOREIGN KEY ("aDMId") REFERENCES "ADM" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Books" ("ISBN", "aDMId", "author", "cover", "id", "loanId", "rating", "title", "year") SELECT "ISBN", "aDMId", "author", "cover", "id", "loanId", coalesce("rating", 0) AS "rating", "title", "year" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
CREATE UNIQUE INDEX "Books_ISBN_key" ON "Books"("ISBN");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
