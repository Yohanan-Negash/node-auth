const express = require('express');
const connectDB = require('./config/database');

//Connect to DB
connectDB();

//Initialize express
const app = express();
app.use(express.json());

//Bring in env
const port = process.env.PORT || 3001;

//Create server that listens to PORT
app.listen(port, () => console.log(`Server is running on PORT:${port}`));
