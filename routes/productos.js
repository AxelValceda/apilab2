const {Router}=require('express');
const { getProductos, getProducto, addProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const router=Router()
//rutas productos
router.get('/',getProductos)
router.get('/:id_usuario?',getProducto)
router.post('/',addProducto)
router.put('/:id_usuario?',actualizarProducto)
router.delete('/',auth,borrarProducto)







module.exports =router