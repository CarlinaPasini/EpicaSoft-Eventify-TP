const Invitado = require('../modelos/Invitado');

async function listar(req, res, next) {
  try {
    const invitados = await Invitado.obtenerTodos();
    if (req.originalUrl.startsWith('/api')) return res.json(invitados);
    res.render('invitados', { titulo: 'Gestor de Eventos - Invitados', invitados });
  } catch (err) { next(err); }
}

async function crear(req, res, next) {
  try {
    const body = req.body || {};
    const nuevo = await Invitado.crear(body);
    if (req.originalUrl.startsWith('/api')) return res.status(201).json(nuevo);
    res.redirect('/invitados');
  } catch (err) { next(err); }
}

module.exports = { listar, crear };
