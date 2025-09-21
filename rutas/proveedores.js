const express = require('express');
const router = express.Router();
const ctrl = require('../controladores/proveedorController');

router.get('/', ctrl.listar);
router.post('/', ctrl.crear);

module.exports = router;
