const mongoose = require("mongoose");

async function DbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { db: DbConnection };
