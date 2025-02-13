require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/books", authMiddleware, bookRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));