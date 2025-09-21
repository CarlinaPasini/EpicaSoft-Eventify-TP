const fs = require('fs').promises;
const path = require('path');
const DB = path.join(__dirname, '..', 'bd', 'invitados.json');

class Invitado {
  constructor({ id=null, nombre, email = '', rsvp = false }) {
    this.id = id;
    this.nombre = nombre || '';
    this.email = email || '';
    this.rsvp = !!rsvp;
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

  static async obtenerTodos() {
    return await Invitado._leer();
  }

  static async crear(datos) {
    const items = await Invitado._leer();
    const ultimoId = items.length > 0 ? Number(items[items.length - 1].id) : 0;
    const nuevoId = ultimoId + 1;
    const inv = new Invitado({ id: nuevoId, ...datos });
    items.push(inv);
    await fs.mkdir(path.dirname(DB), { recursive: true });
    await fs.writeFile(DB, JSON.stringify(items, null, 2), 'utf8');
    return inv;
  }
}

module.exports = Invitado;
