# 🧩 CRUD Angular + .NET + MySQL (XAMPP) con Filtrado en Tiempo Real

Este proyecto es una aplicación web completa que permite realizar operaciones **CRUD** (Crear, Leer, Actualizar y Eliminar) y **filtrado en tiempo real** en una tabla de datos. Está desarrollado con **Angular** en el frontend, **.NET Web API** en el backend, y utiliza **MySQL** (ejecutándose en **XAMPP**) como sistema de almacenamiento de datos.

---

## 🚀 Características principales

- ✅ Visualización de datos en una tabla con paginación y filtrado en tiempo real
- ➕ Crear nuevos registros
- ✏️ Editar registros existentes
- ❌ Eliminar registros
- 🔍 Filtro dinámico sin recargar la página
- ⚙️ API RESTful para comunicar el frontend con el backend
- 🛠️ Base de datos MySQL autogestionada con XAMPP

---

## 🛠️ Tecnologías utilizadas

| Componente  | Tecnología                     |
|-------------|-------------------------------|
| Frontend    | Angular                        |
| Backend     | NET  Web API  |
| Base de datos | MySQL (XAMPP)               |
| Comunicación | API RESTful                  |
| IDEs        | Visual Studio, VS Code        |

---
## ⚙️ Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalados:

- [Node.js y npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Visual Studio 2022+](https://visualstudio.microsoft.com/) con el SDK de .NET
- [XAMPP](https://www.apachefriends.org/index.html) con Apache y MySQL habilitados

---

## 🧰 Pasos para ejecutar el proyecto

### 🖥️ 1. Clonar el repositorio

```bash
https://github.com/braduoc/gestion-peronal.git
```
Instala las dependencias del proyecto:
```bash
npm install
```
Ejecuta la app Angular:
```bash
ng serve```
```
---

### 2. 🛢️ Configurar la base de datos MySQL en XAMPP

1. Abre el panel de control de **XAMPP** y enciende **Apache** y **MySQL**.
2. Abre tu navegador y entra en [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Crea una base de datos llamada `system`.
4. Ejecuta el script SQL ubicado en `database/init.sql` (puedes pegarlo en phpMyAdmin → SQL).

---

### 3. 🧱 Configurar y ejecutar el backend en .NET

1. Abre la carpeta `WebApplication1` en **Visual Studio** o **VS Code**.
2. Asegúrate de que el archivo `appsettings.json` tenga la cadena correcta de conexión:



Instala las dependencias del proyecto :
```bash
dotnet install
```

Ejecuta el backend:
```bash
dotnet run
```



