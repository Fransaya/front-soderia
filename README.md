# Guía de Instalación de Angular en Windows

Sigue estos pasos para configurar Angular en una PC con Windows.

## Paso 1: Instalar Node.js y npm

Angular requiere Node.js y npm (Node Package Manager) para funcionar. Si no los tienes instalados, sigue estos pasos:

1. **Descargar Node.js**

   - Ve a la página oficial de Node.js en [https://nodejs.org/](https://nodejs.org/).
   - Descarga la última versión estable de Node.js (la versión LTS es recomendable).
   - Abre el instalador descargado y sigue los pasos de instalación. Asegúrate de habilitar la opción "Add to PATH" durante la instalación.

2. **Verificar la instalación**
   - Abre la consola de Windows (puedes buscar "cmd" o "PowerShell" en el menú de inicio).
   - Escribe los siguientes comandos para verificar que Node.js y npm se han instalado correctamente:
     comando 1
     node -v

     comando 2:
     npm -v

   - Estos comandos deberían devolver las versiones de Node.js y npm. Si ves las versiones, ¡Node.js y npm están correctamente instalados!

## Paso 2: Instalar Angular CLI

Angular CLI (Command Line Interface) es una herramienta que permite crear y gestionar proyectos Angular. Vamos a instalarla globalmente en tu sistema.

1. En la consola de Windows, ejecuta el siguiente comando:

   npm install -g @angular/cli

## Paso 3: Instalacion del proyecto.

1. Una vex instalado angular, entrar a la carpeta de proyecto y ejecutar el comando <npm install> para instalar las depencias del mismo
2. y luego de instalar las dependencias del proyecto para poder levantarlo localmente ejecutar <ng serve>.
