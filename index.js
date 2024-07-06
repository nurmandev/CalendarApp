const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

// Connect to MongoDB
connectDB();

const todoRoutes = require("./routes/todos");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");
const googleCalendarRoutes = require('./routes/googleCalendar');

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
app.use('/google-calendar', googleCalendarRoutes);


// Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
