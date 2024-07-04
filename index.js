const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const todoRoutes = require("./routes/todos");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello Calendar App");
  res.send("Hello Calendar App");
});
app.use("/api/todos", todoRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((error) => console.log(error));
