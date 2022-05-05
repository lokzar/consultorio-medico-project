// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const moment = require ("moment");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerHelper("fecha", function(fechaSinFormato){

    const fechaFormateada = moment(fechaSinFormato).format("DD/MM/YYYY hh:mm A")
    return fechaFormateada
})

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "consultorio-medico-project";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Ruta para citas
const appointment = require("./routes/appointment.routes")
app.use("/", appointment);

// Ruta servicios
const service = require("./routes/service.routes")
app.use("/", service);

const packageRoutes=require("./routes/package.routes");
app.use("/", packageRoutes)

const users = require("./routes/user.routes")
app.use("/", users);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;