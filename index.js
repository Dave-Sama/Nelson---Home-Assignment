// Req packages init.
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Req files init:

// Swagger
const getChildren_swagger = require('./Samples/GetChildren_swagger.json');
const getTeachers_swagger = require('./Samples/GetTeachers_swagger.json');

// Routes
const router = require('./routes/school');

// App init
const app = express();

// SwaggerDocs init
// const swaggerDocs = swaggerJsDoc(getChildren_swagger);
// app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/school', router);

// Port config
const port = process.env.PORT || 5000;

// App Listen
app.listen(port, () => {
	console.log('Listening to port ', port);
});
