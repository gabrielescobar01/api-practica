const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 4000;
const { usuarios } = require('./usuarios.json'); 

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/usuarios', (req, res) => {
    res.json({usuarios});  // usuarios: usuarios
})
app.post('/usuarios/crear',(req, res) => {
    const { nombre, apellido, email, telefono, domicilio, nacionalidad, estadoCivil, sexo, fechaNacimiento } = req.body;
    const id = usuarios.length + 1;
    const newUser = { id, nombre, apellido, email, telefono, domicilio, nacionalidad, estadoCivil, sexo, fechaNacimiento };
    usuarios.push(newUser);
    fs.writeFileSync('usuarios.json', JSON.stringify({ usuarios }));
    res.json({
        "success": true,
        "msg": "Successfully added"
    });
})


app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const user = usuarios.find(user => user.id == id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            "success": false,
            "msg": "User not found"
        });
    }
})
//settings
app.set('json spaces', 4);

// listen
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})


