## 1. Configuración de Vercel

- [x] 1.1 Crear `vercel.json` en la raíz con `buildCommand` (`npm run build`), `outputDirectory` (`apps/shell/dist`) e `installCommand` (`npm ci`) y verificar que el archivo JSON es válido
- [x] 1.2 Añadir `engines.node` (`>=22`) al `package.json` raíz (y/o crear `.nvmrc` con `22`) y verificar con `npm pkg get engines` que queda fijado

## 2. Despliegue

- [ ] 2.1 Importar el repositorio en Vercel (GitHub) con Root Directory = raíz del repo y verificar que Vercel detecta el framework/static y usa `apps/shell/dist`
- [ ] 2.2 Desencadenar el primer build y verificar que los logs terminan sin errores y que `apps/shell/dist/index.html`, `assets/*` y `vendor/*` se generan

## 3. Verificación y documentación

- [ ] 3.1 Verificar en la URL desplegada que la página de inicio renderiza y que los assets y `/vendor/*` responden 200 (sin 404)
- [ ] 3.2 Verificar la vista en paralelo (`#!/preview`) en la URL desplegada: `<form-editor-react>` y `<form-renderer-angular>` se montan y se comunican por canales
- [x] 3.3 Actualizar el `README.md` con una sección de despliegue (GitHub + Vercel y alternativa por CLI) y verificar que las instrucciones son coherentes con `vercel.json`
