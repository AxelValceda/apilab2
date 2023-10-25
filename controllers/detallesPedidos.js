
const {getConnection}=require('../database/db')



const getDetallePedidos= async (req, res) => {
    const connection = await getConnection();
    connection.query('SELECT * FROM detalle_pedidos', (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No hay datos');
    }
  });
}; 

const getDetallePedido= async (req, res) => {
    const { id_detpedidos } = req.params;
    const connection = await getConnection();
    const sql = `SELECT * FROM pedidos WHERE id_detpedidos = ${connection.escape(id_detpedidos)}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('Sin resultados');
      }
    });
  };
  



  const addDetallePedido= async (req, res) => {
    const { cantidad, id_pedidos, id_productos } = req.body;
    if (cantidad === undefined || id_pedidos === undefined || id_productos === undefined) {
      res.status(404).json({ message: "No puede cargar campos vacios" });
    }
    const connection = await getConnection();
    const sql = 'INSERT INTO pedidos SET ?';

    const pedidosObj = {
      cantidad: req.body.cantidad,
      id_pedidos: req.body.id_pedidos,
      id_productos: req.body.id_productos
    };
  
    connection.query(sql, pedidosObj, error => {
      if (error) throw error;
      res.send('detalles de pedido añadido!');
    });
  };
  


const actualizarDetallePedido= async (req, res)=> {
    const { cantidad, id_pedidos, id_productos } = req.params;
    if (cantidad === undefined || id_pedidos === undefined || id_productos === undefined) {
      res.status(404).json({ message: "No puede cargar campos vacios" });
    }

    const connection = await getConnection();
    const sql = `UPDATE detalle_pedidos SET cantidad = '${cantidad}', id_pedidos= '${id_pedidos}',id_productos= '${id_productos}' WHERE id_pedidos =${id_pedidos}`;

    connection.query(sql, error =>{
        if (error) throw error;
        res.send('detalles de pedido actualizado!')
    });
   


}; 


const borrarDetallePedido= async (req, res)=> {
   const {id_detpedidos} = req.params;
   const connection = await getConnection();
   const sql =  `DELETE FROM detalle_pedidos WHERE id_detpedidos= ${id_detpedidos}`;

    await connection.query (sql, error =>{
    if (error) throw error;
    res.send('detalles de pedido eliminado!')
   });

}; 



module.exports ={
  getDetallePedidos,
  getDetallePedido,
  addDetallePedido,
  actualizarDetallePedido,
  borrarDetallePedido
}