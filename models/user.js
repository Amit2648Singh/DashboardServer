// models/User.js
const fs = require("fs");
const path = require("path");

class User {
  static getAllUsers() {
    const data = fs.readFileSync(path.join(__dirname, "../user.json"));
    return JSON.parse(data);
  }
}

module.exports = User;
