const {getConnection}=require('../database/db')

const getProductos= async (req, res) => {
    const connection = await getConnection();
    connection.query('SELECT * FROM productos', (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No hay datos');
    }
  });
}; 

const getProducto= async (req, res) => {
    const { id_productos } = req.params;
    const connection = await getConnection();
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
  



  const addProducto= async (req, res) => {
    const { nombre, descripcion, precio, cantidad_stock } = req.body;
    if (nombre === undefined || descripcion === undefined || precio === undefined || cantidad_stock === undefined) {
      res.status(404).json({ message: "No puede cargar campos vacios" });
    }
    const connection = await getConnection();
    const sql = 'INSERT INTO productos SET ?';

    const productosObj = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      cantidad_stock: req.body.cantidad_stock
    };
  
    connection.query(sql, productosObj, error => {
      if (error) throw error;
      res.send('producto aÃ±adido!');
    });
  };
  


const actualizarProducto= async (req, res)=> {
    const { id_productos } = req.params;
    const { nombre, descripcion, precio, cantidad_stock } = req.body;
    if (nombre === undefined || descripcion === undefined || precio === undefined || cantidad_stock === undefined) {
      res.status(404).json({ message: "No puede cargar campos vacios" });
    }

    const connection = await getConnection();
    const sql = `UPDATE productos SET nombre = '${nombre}', descripcion= '${descripcion}',precio = '${precio}', cantidad_stock ='${cantidad_stock}' WHERE id_productos =${id_productos}`;

    connection.query(sql, error =>{
        if (error) throw error;
        res.send('producto actualizado!')
    });
   


}; 


const borrarProducto= async (req, res)=> {
   const {id_productos} = req.params;
   const connection = await getConnection();
   const sql =  `DELETE FROM productos WHERE id_productos= ${id_productos}`;

    await connection.query (sql, error =>{
    if (error) throw error;
    res.send('producto eliminado!')
   });

}; 



module.exports ={
  getProductos,
  getProducto,
  addProducto,
  actualizarProducto,
  borrarProducto
}