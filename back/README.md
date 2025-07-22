# 🚚 Backend – Plataforma de Logística

Este es el backend de la aplicación fullstack desarrollada como parte de una prueba técnica para una empresa de logística. Proporciona una API REST segura para la creación y gestión de órdenes de envío, con roles diferenciados para **clientes** y **administradores**.

---

## ⚙️ Tecnologías utilizadas

- **Node.js** + **Express** – Framework principal
- **JavaScript** – Lenguaje base del proyecto
- **JWT** – Autenticación con tokens
- **bcryptjs** – Encriptación de contraseñas
- **dotenv** – Variables de entorno

---

## 🧾 Funcionalidades principales

- Inicio de sesión (cliente y administrador)
- Creación de órdenes con validaciones de negocio
- Consulta de órdenes:
  - Clientes: solo sus propias órdenes
  - Administradores: todas las órdenes
- Actualización del estatus de una orden (solo administradores)

---

## 📄 Instrucciones de instalación y ejecución

1. Clonar el repositorio:

   git clone https://github.com/DiaczukMatias/module-orders.git
   cd module-orders/back

2. Instalar dependencias:
   npm install

3. Crear archivo .env para variables de entorno:
   touch .env

   y agregar:
   MONGODB_URI=mongodb+srv://diaczukm:nbxRwksEzhUMn0jb@logistics-cluster.sn3qxom.mongodb.net/logisticsDB?retryWrites=true&w=majority&appName=logistics-cluster
   PORT=3001
   JWT_SECRET="#zX&v9YLc!pS2Hq@W7uM"

4. Iniciar la aplicación:
   npm run dev
