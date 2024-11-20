const customers = require("../user.json");
const getCustomers = async ({ page, limit, search, sort }) => {
  try {
    let filteredCustomers = customers;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredCustomers = filteredCustomers.filter((customer) =>
        Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(lowerSearch)
        )
      );
    }
    if (sort) {
      filteredCustomers = filteredCustomers.sort((a, b) => {
        const dataA = new Date(a.date);
        const dataB = new Date(b.date);
        if (sort === "acc") {
          return dataA - dataB;
        } else if (sort === "desc") {
          return dataB - dataA;
        }
      });
    }
    const total = filteredCustomers.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    const data = filteredCustomers.slice(start, end);
    const itemFrom = start + 1;
    const itemTo = Math.min(start + data.length, filteredCustomers.length);
    const totalPage = Math.ceil(data.length / limit);
    console.log(itemFrom, itemTo, "start");

    const activeCustomer = filteredCustomers.filter(
      (item) => item.status === "Active"
    );
    return { data, total, activeCustomer, itemFrom, itemTo, totalPage };
  } catch (error) {
    console.error("Error in customer model:", error);
    throw error;
  }
};

module.exports = { getCustomers };
