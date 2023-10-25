const {getConnection}=require('../database/db')


const getPedidos= async (req, res) => {
  const connection = await getConnection();
  connection.query('SELECT * FROM pedidos', (error, results) => {
  if (error) throw error;
  if (results.length > 0) {
    res.json(results);
  } else {
    res.send('No hay datos');
  }
});
}; 

const getPedido= async (req, res) => {
  const { id_pedidos } = req.params;
  const connection = await getConnection();
  const sql = `SELECT * FROM pedidos WHERE id_pedidos = ${connection.escape(id_pedidos)}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Sin resultados');
    }
  });
};




const addPedido= async (req, res) => {
  const { fecha, id_usuario } = req.body;
  if (fecha === undefined || id_usuario === undefined) {
    res.status(404).json({ message: "No puede cargar campos vacios" });
  }
  const connection = await getConnection();
  const sql = 'INSERT INTO pedidos SET ?';

  const pedidosObj = {
    fecha: req.body.fecha,
    id_usuario: req.body.id_usuario
  };

  connection.query(sql, pedidosObj, error => {
    if (error) throw error;
    res.send('pedido añadido!');
  });
};



const actualizarPedido= async (req, res)=> {
  const { id_pedidos } = req.params;
  if (fecha === undefined || id_usuario === undefined) {
    res.status(404).json({ message: "No puede cargar campos vacios" });
  }

  const connection = await getConnection();
  const sql = `UPDATE pedidos SET fecha = '${fecha}', id_usuario= '${id_usuario}' WHERE id_pedidos =${id_pedidos}`;

  connection.query(sql, error =>{
      if (error) throw error;
      res.send('pedido actualizado!')
  });
 


}; 


const borrarPedido= async (req, res)=> {
 const {id_pedidos} = req.params;
 const connection = await getConnection();
 const sql =  `DELETE FROM pedidos WHERE id_pedidos= ${id_pedidos}`;

  await connection.query (sql, error =>{
  if (error) throw error;
  res.send('pedido eliminado!')
 });

}; 



module.exports ={
getPedidos,
getPedido,
addPedido,
actualizarPedido,
borrarPedido
}
