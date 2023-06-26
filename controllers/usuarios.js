
const jwt = require("jsonwebtoken");
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'nautico1290',
    database:'laboratorio3'
});



const getUsuarios= (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No hay datos');
      }
    });
  }; 
  
  const getUsuario= (req, res) => {
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
    };
    
  
  
  
    const addUsuario=(req, res) => {
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
    };
    
  
  
  const actualizarUsuario= (req, res)=> {
      const { id_usuario } = req.params;
      const  {nombre, email,contraseña } = req.body;
      const sql = `UPDATE usuarios SET nombre = '${nombre}', email= '${email}',contraseña = '${contraseña}' WHERE id_usuario =${id_usuario}`;
  
      connection.query(sql, error =>{
          if (error) throw error;
          res.send('usuario actualizado!')
      });
     
  
  
  }; 
  
  
  const borrarUsuario= (req, res)=> {
     const {id_usuario} = req.body;
     const sql =  `DELETE FROM usuarios WHERE id_usuario= ${id_usuario}`;
  
     connection.query(sql, error =>{
      if (error) throw error;
      res.send('Usuario eliminado!')
     });
  
  }; 
  
  //jwt login
  const login= (req, res)=> {
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
    
  
  }; 
  module.exports ={getUsuarios,getUsuario,addUsuario,actualizarUsuario,borrarUsuario,login}