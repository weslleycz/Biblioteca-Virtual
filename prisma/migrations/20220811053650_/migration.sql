-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registration" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "pendency" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ISBN" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "cover" TEXT,
    "loanId" TEXT,
    CONSTRAINT "Books_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loans" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Loans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "userId" TEXT NOT NULL,
    "sinceLoan" TEXT NOT NULL,
    CONSTRAINT "Loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Books_ISBN_key" ON "Books"("ISBN");