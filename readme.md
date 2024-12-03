# Arquitectura Web Proyecto

Este proyecto es una aplicación web desarrollada con Node.js, Express y Sequelize para la gestión de clientes, ventas y puntos de fidelidad.

### Requisitos

- Node.js
- PostgreSQL

### Instalación

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Navega al directorio del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

3. Instala las dependencias:

```bash
npm install
```

### Configuración de la Base de Datos

1. Asegúrate de tener PostgreSQL instalado y en funcionamiento.
2. Configura la conexión a la base de datos en el archivo `db.config.js`.

### Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
node server.js
```

El servidor estará disponible en [http://localhost:9090](http://localhost:9090).

## Rutas Disponibles

### Clientes

- `POST /api/cliente`: Crear un nuevo cliente.
- `GET /api/cliente`: Obtener todos los clientes o buscar por nombre.
- `GET /api/cliente/:id`: Obtener un cliente por ID.
- `DELETE /api/cliente/:id`: Eliminar un cliente por ID.
- `GET /api/cliente/segmentacion`: Segmentar clientes por edad, ubicación o historial de compras.

### Ventas

- `POST /api/venta`: Crear una nueva venta.
- `GET /api/venta`: Obtener todas las ventas o buscar por nombre de cliente.
- `GET /api/venta/:id`: Obtener una venta por ID.

### Saldo de Puntos

- `POST /api/pointBalance`: Crear o actualizar el saldo de puntos.
- `GET /api/pointBalance`: Obtener todos los saldos de puntos o buscar por ID de cliente.
- `GET /api/pointBalance/:id`: Obtener un saldo de puntos por ID.
- `DELETE /api/pointBalance/:id`: Eliminar un saldo de puntos por ID.

### Uso de Puntos

- `POST /api/pointusage`: Crear un nuevo uso de puntos.
- `GET /api/pointusage`: Obtener todos los usos de puntos.
- `GET /api/pointusage/:id`: Obtener un uso de puntos por ID.

### Conceptos de Uso de Puntos

- `POST /api/pointusageconcept`: Crear un nuevo concepto de uso de puntos.
- `GET /api/pointusageconcept`: Obtener todos los conceptos de uso de puntos.
- `GET /api/pointusageconcept/:id`: Obtener un concepto de uso de puntos por ID.
- `PUT /api/pointusageconcept/:id`: Actualizar un concepto de uso de puntos por ID.
- `DELETE /api/pointusageconcept/:id`: Eliminar un concepto de uso de puntos por ID.

### Reglas de Asignación de Puntos

- `POST /api/pointassignmentrule`: Crear una nueva regla de asignación de puntos.
- `GET /api/pointassignmentrule`: Obtener todas las reglas de asignación de puntos o buscar por límite inferior o superior.
- `GET /api/pointassignmentrule/:id`: Obtener una regla de asignación de puntos por ID.
- `PUT /api/pointassignmentrule/:id`: Actualizar una regla de asignación de puntos por ID.
- `DELETE /api/pointassignmentrule/:id`: Eliminar una regla de asignación de puntos por ID.

### Parametrizaciones de Vencimiento de Puntos

- `POST /api/pointExpiration`: Crear una nueva parametrización de vencimiento de puntos.
- `GET /api/pointExpiration`: Obtener todas las parametrizaciones de vencimiento de puntos.
- `GET /api/pointExpiration/:id`: Obtener una parametrización de vencimiento de puntos por ID.
- `PUT /api/pointExpiration/:id`: Actualizar una parametrización de vencimiento de puntos por ID.
- `DELETE /api/pointExpiration/:id`: Eliminar una parametrización de vencimiento de puntos por ID.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.
