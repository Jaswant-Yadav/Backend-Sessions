require("dotenv").config();
const express = require("express");
const cors = require("cors");
require('./config/db')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/sessionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
