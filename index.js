// server.js
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
app.use(cors({ origin: "*" }));

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
