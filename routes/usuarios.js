const {Router}=require('express');
const { getUsuarios, addUsuario, getUsuario, actualizarUsuario, borrarUsuario, login } = require('../controllers/usuarios');
const auth = require('../auth');
const router=Router()
//rutas Usuarios
router.get('/',getUsuarios)
router.get('/:id_usuario?',getUsuario)
router.post('/',addUsuario)
router.put('/:id_usuario?',actualizarUsuario)
router.delete('/',auth,borrarUsuario)
router.post('/login',login)






module.exports =router
