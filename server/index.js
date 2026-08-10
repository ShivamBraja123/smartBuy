require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);

app.use(cors());

// Connect Database
setupDB();

// Passport Authentication
require('./config/passport')(app);

// Serve uploaded images
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// Routes
app.use(routes);

// Start Server
const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

// Socket
socket(server);