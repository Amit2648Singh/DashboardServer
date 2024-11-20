const { getCustomers } = require("../models/customer");

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
  const data = User.getCustomers(page, limit, search, sort);

  res.json({
    totalUsers: filteredUsers.length,
    page: pageInt,
    itemFrom,
    itemTo,
    totalPages: Math.ceil(filteredUsers.length / limitInt),
    users: paginatedUsers,
    data: data,
  });
};
const getCustomerList = async (req, res) => {
  try {
    let { page = 1, limit = 10, search, sort } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: "Invalid page " });
    }
    const result = await getCustomers({ page, limit, search, sort });

    res.json({
      totalUsers: result.total,
      page: page,
      itemFrom: result.itemFrom,
      itemTo: result.itemTo,
      totalPages: result.totalPage,
      activeCustomer: result.activeCustomer.length,
      users: result.data,
    });
  } catch (error) {
    console.error("Error fetching customer list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getUsers,
  getCustomerList,
};
