// controllers/userController.js
const User = require("../models/User");

const getUsers = (req, res) => {
  const { page = 1, limit = 2, search = "", sort = "asc" } = req.query;
  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);

  const allUsers = User.getAllUsers();
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUser = filteredUsers.sort((a, b) => {
    const dataA = new Date(a.date);
    const dataB = new Date(b.date);
    if (sort === "acc") {
      return dataA - dataB;
    } else if (sort === "desc") {
      return dataB - dataA;
    }
  });

  const startIndex = (pageInt - 1) * limitInt;
  const paginatedUsers = sortedUser.slice(startIndex, startIndex + limitInt);
  const itemFrom = startIndex + 1;
  const itemTo = Math.min(
    startIndex + paginatedUsers.length,
    filteredUsers.length
  );
  res.json({
    totalUsers: filteredUsers.length,
    page: pageInt,
    itemFrom,
    itemTo,
    totalPages: Math.ceil(filteredUsers.length / limitInt),
    users: paginatedUsers,
  });
};

module.exports = {
  getUsers,
};
