const express = require('express');
const connectDB = require('./config/database');
const auth = require('./middleware/auth');

//Connect to DB
connectDB();

//Initialize express
const app = express();
app.use(express.json());

//Bring in env
const port = process.env.PORT || 3001;

//Define routes
app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome');
});

//Create server that listens to PORT
app.listen(port, () => console.log(`Server is running on PORT:${port}`));
