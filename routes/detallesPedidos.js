const {Router}=require('express');
const {  getDetallePedidos,getDetallePedido,addDetallePedido,actualizarDetallePedido,borrarDetallePedido } = require('../controllers/detallesPedidos');
const router=Router()
//rutas productos
router.get('/',getDetallePedidos)
router.get('/:id_usuario?',getDetallePedido)
router.post('/',addDetallePedido)
router.put('/:id_usuario?',actualizarDetallePedido)
router.delete('/',borrarDetallePedido)







module.exports =router