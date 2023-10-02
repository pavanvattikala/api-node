const express = require('express')
const app = express();


app.use(express.json());


const apiRouter = require("./Routes/apiRouter");


app.use('/api',apiRouter);

app.listen(5000,() =>{
    console.log('server started...');
});
