### FRONTEND DRENVIO (REACT + VITE)

Programa creado en React para el uso de la api que obtiene los precios especiales de cada producto por usuario.

## ¿Como instalar?
#### Localmente:
1. Clonar el respositorio desde: https://github.com/Jassonesteban/frontend-react-drenvio.git
2. Abrir la carpeta del proyecto clonado en VSCODE y ejecutar **npm install* para instalar las dependencias y node_modules.
3. Para ejecutar el proyecto corremos la terminal integrada y ponemos el siguiente comando: **npm run dev** para subir el proyecto.
4. el proyecto correra en la url: http://localhost:5173/

#### En la nube:
1. Ingresar a la url en VERCEL: https://frontend-react-drenvio.vercel.app/home

####Nota: Para obtener la información de los productos, primero hay que ejecutar la API de los precios especiales, puede descargarse de aqui: https://github.com/Jassonesteban/api-special-price-node

## Especificaciones Técnicas de la Aplicación en React

1. Descripción General
La aplicación es una Single Page Application (SPA) desarrollada con React.js, desplegada en Vercel, y se comunica con una API en Node.js con MongoDB para gestionar datos.

2. Tecnologías Utilizadas
   
**Frontend**: React.js con Vite o Create React App.
**Backend**: Node.js con Express y MongoDB.
**Despliegue**: Vercel (Frontend).

3. Arquitectura del Proyecto
Component-Based Architecture: La aplicación está dividida en componentes reutilizables.
State Management: Uso de useState y Context API para manejar estados globales.
Routing: Uso de React Router para manejar las rutas y navegación.
HTTP Requests: Uso de fetch o Axios para consumir la API en Node.js.

4. Estructura de Carpetas
src/
├── components/ → Componentes reutilizables.
├── pages/ → Páginas principales (Home, Login, Dashboard, etc.).
├── context/ → Context API para manejo de estado global.
├── services/ → Funciones para interactuar con la API.
├── utils/ → Funciones auxiliares (formatos, validaciones, etc.).
├── routes/ → Definición de rutas con React Router.
├── styles/ → Archivos CSS o Tailwind para estilos.
├── App.js → Punto de entrada principal.
├── index.js → Renderiza la aplicación en el DOM.

6. Funcionalidades Principales
   
* Búsquedas Predictivas: Implementadas en inputs para usuarios y productos.
* CRUD: Gestión de productos y precios especiales.
* Consumo de API: Comunicación con el backend en Node.js.
* Manejo de Errores: Validaciones con Joi en backend y frontend.
* Despliegue: Deploy en Vercel con integración continua desde GitHub.

7. Justificación de Tecnologías
React.js: Permite construir interfaces interactivas con reactividad.
React Router: Maneja la navegación sin recargar la página.
Context API: Evita el prop drilling y facilita la gestión del estado global.
Fetch: Para hacer solicitudes HTTP a la API.
Tailwind CSS: Para estilos rápidos y personalizados.
Vercel: Facilita el despliegue y hosting con integración continua.
