const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dbPath = path.join(__dirname, "books.db");

const seedBooks = [
  { title: "The Alchemist", author: "Paulo Coelho", price: 299, pages: 208 },
  { title: "Atomic Habits", author: "James Clear", price: 450, pages: 320 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", price: 350, pages: 281 },
  { title: "Clean Code", author: "Robert C. Martin", price: 750, pages: 464 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 250, pages: 180 },
  { title: "1984", author: "George Orwell", price: 320, pages: 328 },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 800, pages: 352 },
  { title: "Sapiens", author: "Yuval Noah Harari", price: 550, pages: 443 },
  { title: "Deep Work", author: "Cal Newport", price: 400, pages: 304 },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 499, pages: 309 }
];

async function setupDatabase(existingDb = null) {
  const db = existingDb || await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price INTEGER NOT NULL,
      pages INTEGER NOT NULL
    );
  `);

  const countRow = await db.get(`SELECT COUNT(*) AS count FROM book;`);
  if (countRow.count === 0) {
    console.log("Seeding initial 10 books into database...");
    const insertQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;
    for (const book of seedBooks) {
      await db.run(insertQuery, [book.title, book.author, book.price, book.pages]);
    }
    console.log("Database seeded successfully with 10 books.");
  } else {
    console.log(`Database already contains ${countRow.count} records.`);
  }

  return db;
}

// Allow direct execution: `node initDb.js`
if (require.main === module) {
  setupDatabase()
    .then((db) => {
      console.log("Database setup complete.");
      return db.close();
    })
    .catch((err) => {
      console.error("Error setting up database:", err);
      process.exit(1);
    });
}

module.exports = { setupDatabase, dbPath };
