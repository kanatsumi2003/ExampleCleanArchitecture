const express = require('express');
require('dotenv').config();
const app = express();
const userRoute = require("./src/Api/Routes/UserRoutes");
const roleRoute = require("./src/Api/Routes/RoleRoutes");
const PORT = process.env.PORT;
app.use(express.json());    

// app.use("/api", userRoute);
app.use("/api", roleRoute);
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is runnit at port: ${PORT}`);
})