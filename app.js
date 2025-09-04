const express = require('express');
const path = require('path');// trabalhar com arquivos / impotar
const userRoutes = require('./src/routes/userRoutes'); 
const postgres = require('postgres');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

//=====================
//conecta com o banco
//=====================

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

// Middlewares para parsing de dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes)

app.use((err, req, res, next) => { // captura qualquer erro do app
    console.error(err.stack); // retorna o stacktrace
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = sql;
