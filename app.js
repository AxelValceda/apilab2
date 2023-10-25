const express = require('express');
const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const userRoutesUsuarios=require('./routes/usuarios');
const userRoutesProductos=require('./routes/productos');
const userRoutesPedidos=require('./routes/pedidos');
const userRoutesDetallesPedidos=require('./routes/detallesPedidos');






//instalando dependecias

const bodyParser = require('body-parser');
const auth = require('./auth');
const { error } = require('console');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
//Rutas
app.use('/usuarios',userRoutesUsuarios);
app.use('/productos',userRoutesProductos);
app.use('/pedidos',userRoutesPedidos);
app.use('/detallesPedidos',userRoutesDetallesPedidos);



//ruta principal
app.get('/', (req,res)=> {
    res.send('Bienvenidos a mi API');

});




app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));
