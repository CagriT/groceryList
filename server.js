const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const inputRoutes = require('./routes/inputRoutes');

dotenv.config({ path: 'config.env' });
// I used config.env file to keep my database password and link and some relevant private info
// I am sending config.env file in the attachment of my email.
const app = express();

app.use(cors());
app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('connection with MongoDB DATABASE is successful ');
  });

app.use('/inputs', inputRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
