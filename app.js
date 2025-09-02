const express = require('express');
const path = require('path');// trabalhar com arquivos / impotar
const studentRoutes = require('./routes/student'); 
const adminRoutes = require('./routes/admin'); 
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

//=====================
//conecta com o banco
//=====================

app.use('/student', studentRoutes)
app.use('/admin', adminRoutes)

app.use((err, req, res, next) => { // captura qualquer erro do app
    console.error(err.stack); // retorna o stacktrace
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});