const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./router/index'));


app.listen('3000', function(){
    console.log('Server listening in port 3000')
})