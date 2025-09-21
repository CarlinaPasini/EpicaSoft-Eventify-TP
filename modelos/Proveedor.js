const fs = require('fs').promises;
const path = require('path');
const DB = path.join(__dirname, '..', 'bd', 'proveedores.json');

class Proveedor {
  constructor({ id = null, nombre, categoria = '', contacto = '', precio = 0 }) {
    this.id = id;
    this.nombre = nombre || '';
    this.categoria = categoria;
    this.contacto = contacto;
    this.precio = Number(precio) || 0;
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
    return await Proveedor._leer();
  }

  static async crear(datos) {
    const items = await Proveedor._leer();
    const ultimoId = items.length > 0 ? Number(items[items.length - 1].id) : 0;
    const nuevoId = ultimoId + 1;
    const p = new Proveedor({ id: nuevoId, ...datos });
    items.push(p);
    await fs.mkdir(path.dirname(DB), { recursive: true });
    await fs.writeFile(DB, JSON.stringify(items, null, 2), 'utf8');
    return p;
  }
}

module.exports = Proveedor;
