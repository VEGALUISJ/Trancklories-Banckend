const route = require('express').Router();

route.get('/',(req, res) => {
    res.send('Todo Bien')
})

route.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Usuario registrado con exito')
})

module.exports = route;