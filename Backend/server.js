const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./configs/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
