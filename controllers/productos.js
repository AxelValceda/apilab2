const mysql = require('mysql2');


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'nautico1290',
    database:'laboratorio3'
});



const getProductos= (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No hay datos');
      }
    });
  }; 
  
  const getProducto= (req, res) => {
      const { id_productos } = req.params;
      const sql = `SELECT * FROM productos WHERE id_productos = ${connection.escape(id_productos)}`;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          res.json(result);
        } else {
          res.send('Sin resultados');
        }
      });
    };
    
  
  
  
    const addProducto=(req, res) => {
      const sql = 'INSERT INTO productos SET ?';
    
      const productosObj = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad_stock: req.body.cantidad_stock
      };
    
      connection.query(sql, productosObjObj, error => {
        if (error) throw error;
        res.send('Producto añadido!');
      });
    };
    
  
  
  const actualizarProducto= (req, res)=> {
      const { id_productos } = req.params;
      const  {nombre, descripcion,precio,cantidad_stock } = req.body;
      const sql = `UPDATE productos SET nombre = '${nombre}', descripcion= '${descripcion}',precio = '${precio}',cantidad_stock='${cantidad_stock}' WHERE id_productos =${id_productos}`;
  
      connection.query(sql, error =>{
          if (error) throw error;
          res.send('Producto actualizado!')
      });
     
  
  
  }; 
  
  
  const borrarProducto= (req, res)=> {
     const {id_productos} = req.body;
     const sql =  `DELETE FROM productos WHERE id_u= ${id_productos}`;
  
     connection.query(sql, error =>{
      if (error) throw error;
      res.send('Producto eliminado!')
     });
  
  }; 
  

    
  
   
  module.exports ={getProductos,getProducto,addProducto,actualizarProducto,borrarProducto}