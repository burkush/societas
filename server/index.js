const express = require('express');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/database/dbConnect');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/cors/corsOptions');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(logger);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.all('*', (req, res) => {
  res.json({ error: 'Resource not found' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to the database');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error(err);
  const errorMessage = `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`;
  logEvents(errorMessage, 'dbErrors.log');
});
