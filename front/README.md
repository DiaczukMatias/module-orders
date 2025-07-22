# 📦 Frontend – Plataforma de Logística

Este proyecto corresponde al **frontend** de la prueba técnica para una empresa de logística. La interfaz fue desarrollada utilizando **Next.js**, implementando vistas separadas para clientes y administradores. Permite crear, consultar y modificar órdenes de envío, cumpliendo con las reglas de negocio establecidas.

---

## 🧪 Funcionalidades

### Cliente

- Inicio de sesión
- Crear órdenes con validación de peso y datos
- Visualizar únicamente sus propias órdenes

### Administrador

- Inicio de sesión
- Visualizar todas las órdenes del sistema
- Modificar el estado de cualquier orden

---

## ⚙️ Tecnologías utilizadas

- **Next.js** – Framework principal
- **React Hooks** – `useState`, `useEffect`, `useContext`, etc.
- **Axios** – Comunicación con la API
- **Material UI** – Componentes visuales
- **Local Storage** – Autenticación y sesión

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

   git clone https://github.com/DiaczukMatias/module-orders.git
   cd module-orders/front

2. Instalar dependencias:
   npm install

3. Crear archivo .env para variables de entorno:
   touch .env

   y agregar:
   NEXT_PUBLIC_API_URL=http://localhost:3001/api

4. Iniciar la aplicación:
   npm run dev
