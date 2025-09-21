const Evento = require('../modelos/Evento');
const Proveedor = require('../modelos/Proveedor');
const Invitado = require('../modelos/Invitado');

async function listar(req, res, next) {
  try {
    const eventos = await Evento.obtenerTodos();
    if (req.originalUrl.startsWith('/api')) return res.json(eventos);
    res.render('eventos', { titulo: 'Gestor de Eventos - Eventos', eventos });
  } catch (err) { next(err); }
}

async function detalle(req, res, next) {
  try {
    const evento = await Evento.buscarPorId(req.params.id);
    if (!evento) return res.status(404).send('Evento no encontrado');

    const proveedoresTodos = await Proveedor.obtenerTodos();
    const invitadosTodos = await Invitado.obtenerTodos();

    const proveedores = proveedoresTodos.filter(p => evento.proveedores.includes(String(p.id)));
    const invitados = invitadosTodos.filter(i => evento.invitados.includes(String(i.id)));

    if (req.originalUrl.startsWith('/api')) return res.json({ ...evento, proveedores, invitados });
    res.render('evento_detalle', { titulo: `Detalle - ${evento.nombre}`, evento, proveedores, invitados });
  } catch (err) { next(err); }
}

async function crear(req, res, next) {
  try {
    const body = req.body || {};
    function asegurarArray(v) { if (!v) return []; return Array.isArray(v) ? v : [v]; }
    body.proveedores = asegurarArray(body.proveedores).map(String);
    body.invitados = asegurarArray(body.invitados).map(String);
    const nuevo = await Evento.crear(body);
    if (req.originalUrl.startsWith('/api')) return res.status(201).json(nuevo);
    res.redirect('/eventos');
  } catch (err) { next(err); }
}

async function editarForm(req, res, next) {
  try {
    const evento = await Evento.buscarPorId(req.params.id);
    if (!evento) return res.status(404).send('Evento no encontrado');
    const proveedores = await Proveedor.obtenerTodos();
    const invitados = await Invitado.obtenerTodos();
    res.render('form_evento_edit', { titulo: `Editar - ${evento.nombre}`, evento, proveedores, invitados });
  } catch (err) { next(err); }
}

async function actualizar(req, res, next) {
  try {
    const id = req.params.id;
    const body = req.body || {};
    function asegurarArray(v) { if (!v) return []; return Array.isArray(v) ? v : [v]; }
    body.proveedores = asegurarArray(body.proveedores).map(String);
    body.invitados = asegurarArray(body.invitados).map(String);
    const actualizado = await Evento.actualizar(id, body);
    if (req.originalUrl.startsWith('/api')) return res.json(actualizado);
    res.redirect(`/eventos/${id}`);
  } catch (err) { next(err); }
}

async function eliminar(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await Evento.eliminar(id);
    if (req.originalUrl.startsWith('/api')) return res.json({ deleted: ok });
    res.redirect('/eventos');
  } catch (err) { next(err); }
}

module.exports = { listar, detalle, crear, editarForm, actualizar, eliminar };
