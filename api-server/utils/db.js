const mongoose = require("mongoose");
const DbCongig = require("../config/database");

const connect_db = () => {
    // .DATABASE
    //database connection
    mongoose.connect(DbCongig.uri, DbCongig.options);

    let db = mongoose.connection;

    return new Promise((resolve, reject) => {
        //check connection
        db.once("open", () => {
            console.log("connection success DB...");
            return resolve();
        });
    
        //check for db console.error();
        db.on("error", (err) => {
            console.error(err);
            return reject(err);
        });
    })
}

module.exports = {
    connect_db
}
