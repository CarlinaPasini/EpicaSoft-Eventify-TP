const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const rutasEventos = require('./rutas/eventos');
const rutasProveedores = require('./rutas/proveedores');
const rutasInvitados = require('./rutas/invitados');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'vistas'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Rutas principales
app.get('/', (req, res) => res.render('index', { titulo: 'Gestor de Eventos - Menú principal' }));

app.use('/eventos', rutasEventos);
app.use('/proveedores', rutasProveedores);
app.use('/invitados', rutasInvitados);

// API alias
app.use('/api/eventos', rutasEventos);
app.use('/api/proveedores', rutasProveedores);
app.use('/api/invitados', rutasInvitados);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
