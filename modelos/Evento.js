const fs = require('fs').promises;
const path = require('path');
const DB = path.join(__dirname, '..', 'bd', 'eventos.json');

class Evento {
  constructor({ id = null, nombre, fecha, cliente, presupuesto = 0, proveedores = [], invitados = [], estado = 'planificación', notas = '' }) {
    this.id = id;
    this.nombre = nombre || '';
    this.fecha = fecha || '';
    this.cliente = cliente || '';
    this.presupuesto = Number(presupuesto) || 0;
    this.proveedores = (proveedores || []).map(String);
    this.invitados = (invitados || []).map(String);
    this.estado = estado || 'planificación';
    this.notas = notas || '';
  }

  static async _leer() {
    try {
      const raw = await fs.readFile(DB, 'utf8');
      return JSON.parse(raw || '[]');
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  static async _escribir(data) {
    await fs.mkdir(path.dirname(DB), { recursive: true });
    await fs.writeFile(DB, JSON.stringify(data, null, 2), 'utf8');
  }

  static async obtenerTodos() {
    return await Evento._leer();
  }

  static async buscarPorId(id) {
    const items = await Evento._leer();
    return items.find(e => String(e.id) === String(id)) || null;
  }

  static async crear(datos) {
    const items = await Evento._leer();
    const ev = new Evento(datos);
    items.push(ev);
    await Evento._escribir(items);
    return ev;
  }

  static async actualizar(id, cambios) {
    const items = await Evento._leer();
    const idx = items.findIndex(e => String(e.id) === String(id));
    if (idx < 0) return null;
    items[idx] = { ...items[idx], ...cambios, id: String(id) };
    await Evento._escribir(items);
    return items[idx];
  }

  static async eliminar(id) {
    const items = await Evento._leer();
    const filtrados = items.filter(e => String(e.id) !== String(id));
    if (filtrados.length === items.length) return false;
    await Evento._escribir(filtrados);
    return true;
  }
}

module.exports = Evento;
