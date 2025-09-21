const Proveedor = require('../modelos/Proveedor');

async function listar(req, res, next) {
  try {
    const proveedores = await Proveedor.obtenerTodos();
    if (req.originalUrl.startsWith('/api')) return res.json(proveedores);
    res.render('proveedores', { titulo: 'Gestor de Eventos - Proveedores', proveedores });
  } catch (err) { next(err); }
}

async function crear(req, res, next) {
  try {
    const body = req.body || {};
    const nuevo = await Proveedor.crear(body);
    if (req.originalUrl.startsWith('/api')) return res.status(201).json(nuevo);
    res.redirect('/proveedores');
  } catch (err) { next(err); }
}

module.exports = { listar, crear };
