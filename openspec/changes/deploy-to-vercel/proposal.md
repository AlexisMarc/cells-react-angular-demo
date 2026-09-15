## Why

La demo (monorepo React + Angular + OpenCells con Web Awesome) solo puede levantarse en local. Para compartirla y validarla en un entorno público, hace falta desplegar el build estático del shell en Vercel.

## What Changes

- Añadir una configuración declarativa de Vercel (`vercel.json`) en la raíz con el comando de build, el directorio de salida y el comando de instalación.
- Fijar la versión de Node (>=22), requerida por `@open-cells/core` y Vite 8.
- Documentar el despliegue en el `README.md` (integración con GitHub y alternativa por CLI).

## Capabilities

### New Capabilities
- `vercel-deployment`: build estático reproducible del shell y configuración/servido del sitio en Vercel.

### Modified Capabilities
<!-- Ninguna: el comportamiento de la aplicación no cambia. -->

## Impact

- Nuevo archivo `vercel.json` en la raíz del repo.
- `engines.node` (o `.nvmrc`) para fijar Node >=22.
- `README.md` actualizado con las instrucciones de despliegue.
- Sin cambios en el código de runtime (shell, React, Angular) ni en las dependencias.
