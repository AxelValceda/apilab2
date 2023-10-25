const {Router}=require('express');
const { getPedidos,getPedido,addPedido,actualizarPedido,borrarPedido } = require('../controllers/pedidos');
const router=Router()
//rutas productos
router.get('/',getPedidos)
router.get('/:id_usuario?',getPedido)
router.post('/',addPedido)
router.put('/:id_usuario?',actualizarPedido)
router.delete('/',borrarPedido)







module.exports =router