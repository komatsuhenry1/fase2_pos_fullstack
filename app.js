const express = require('express');
const path = require('path');// trabalhar com arquivos / impotar
const postRoutes = require('./src/routes/postRoutes'); 
const postgres = require('postgres');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// require('dotenv').config(); // remover linha para rodar no docker

const app = express();

const PORT = process.env.PORT || 3000;

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI que estamos usando
    info: {
      title: 'API de Posts', // define title
      version: '1.0.0',
      description: 'Documentação da API para o CRUD de Posts',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/doc/swagger.yaml'], // <-- Olhando para o nosso novo arquivo YAML
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.use('/posts', postRoutes)

app.use((err, req, res, next) => { // captura qualquer erro do app
    console.error(err.stack); // retorna o stacktrace
    res.status(500).send('Something broke!');
});

module.exports = app;
