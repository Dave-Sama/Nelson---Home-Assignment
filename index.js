// Req packages init.
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Req files init:


// Routes
const router = require('./routes/school');

// App init
const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.use('/', router);

// Port config
const port = process.env.PORT || 5000;

// App Listen
app.listen(port, () => {
	console.log('Listening to port ', port);
});
