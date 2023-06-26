const express = require('express');
const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const userRoutes=require('./routes/usuarios')
//instalando dependecias

const bodyParser = require('body-parser');
const auth = require('./auth');
const { error } = require('console');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
//Rutas
app.use('/usuarios',userRoutes)

//MySql
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'nautico1290',
    database:'laboratorio3'
});
//ruta principal
app.get('/', (req,res)=> {
    res.send('Bienvenidos a mi API');

});


//lista de usuarios-CRUD-end points

/*app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No hay datos');
    }
  });
}); 

app.get('/usuarios/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const sql = `SELECT * FROM usuarios WHERE id_usuario = ${connection.escape(id_usuario)}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('Sin resultados');
      }
    });
  });
  



  app.post('/agregar', (req, res) => {
    const sql = 'INSERT INTO usuarios SET ?';
  
    const usuariosObj = {
      nombre: req.body.nombre,
      email: req.body.email,
      contraseña: req.body.contraseña
    };
  
    connection.query(sql, usuariosObj, error => {
      if (error) throw error;
      res.send('Usuario añadido!');
    });
  });
  


app.put('/actualizar/:id_usuario', (req, res)=> {
    const { id_usuario } = req.params;
    const  {nombre, email,contraseña } = req.body;
    const sql = `UPDATE usuarios SET nombre = '${nombre}', email= '${email}',contraseña = '${contraseña}' WHERE id_usuario =${id_usuario}`;

    connection.query(sql, error =>{
        if (error) throw error;
        res.send('usuario actualizado!')
    });
   


}); 


app.delete('/eliminar',auth, (req, res)=> {
   const {id_usuario} = req.body;
   const sql =  `DELETE FROM usuarios WHERE id_usuario= ${id_usuario}`;

   connection.query(sql, error =>{
    if (error) throw error;
    res.send('Usuario eliminado!')
   });

}); 

//jwt login
app.post('/login', (req, res)=> {
  const {id_usuario}=req.body;

  const sql = `SELECT * FROM usuarios WHERE id_usuario = ${connection.escape(id_usuario)}`;
  const token=jwt.sign({id:id_usuario},'kknuzco',{expiresIn:"1h"})
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json({message:'token generado',ok:true,token})
      
    } else {
      res.send('Sin resultados');
    }
  });
  

});*/ 


//Check connection(probar la conexion)
connection.connect(error=>{
    if (error) throw error
    console.log('Database running');
});


app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));
