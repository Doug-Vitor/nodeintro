const express = require('express');
let indexRoute = require('./routes/index');
let userRoute = require('./routes/users');

let app = express();
app.use(indexRoute);
app.use('/users/',userRoute);

app.listen(3000, '127.0.0.1', () => {
    console.log('rodando');
});