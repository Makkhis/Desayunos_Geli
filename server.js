const express = require('express');
const sequelize = require('./config/databases');
const routes = require('./routes/index');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3306;

//middleware
app.use(express.json());

sequelize.sync()
    .then( () => console.log("DB is ready"))
    .catch( err => console.error(err));

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
});

app.use(routes.unprotectedRoutes);