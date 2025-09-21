const express = require('express');
const router = express.Router();
const ctrl = require('../controladores/eventoController');
const Proveedor = require('../modelos/Proveedor');
const Invitado = require('../modelos/Invitado');

router.get('/', ctrl.listar);

router.get('/nuevo', async (req, res, next) => {
  try {
    const proveedores = await Proveedor.obtenerTodos();
    const invitados = await Invitado.obtenerTodos();
    res.render('form_evento', { titulo: 'Nuevo Evento', proveedores, invitados });
  } catch (err) { next(err); }
});

router.post('/', ctrl.crear);

router.get('/:id', ctrl.detalle);

router.get('/:id/editar', ctrl.editarForm);
router.post('/:id/editar', ctrl.actualizar);

// eliminar: soporte POST desde formulario y DELETE vía API/ajax
router.post('/:id/eliminar', ctrl.eliminar);
router.delete('/:id', ctrl.eliminar);

module.exports = router;
