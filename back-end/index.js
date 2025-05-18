const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controllers/usersController.js');

require('./db.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/landing_pages_templates', express.static(path.join(__dirname, 'landing_pages_templates')));

require('./routes')(app);
app.use('/', userController);



// start the server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`The Port Run On ${port}...`));