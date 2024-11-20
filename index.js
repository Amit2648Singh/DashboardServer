const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes/routes");
app.use(cors({ origin: "*" }));

app.use("/api/users", routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
