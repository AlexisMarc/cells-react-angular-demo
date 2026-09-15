## Purpose

El sitio estático del shell se puede compilar de forma reproducible y desplegar en Vercel, quedando accesible públicamente y funcionando igual que en local.

## ADDED Requirements

### Requirement: Build estático reproducible
El proyecto SHALL producir un sitio estático autocontenido a partir de un único comando desde la raíz.

#### Scenario: Build completo
- **WHEN** se ejecuta `npm run build` desde la raíz del repo
- **THEN** se generan `apps/shell/dist/index.html`, los assets (`apps/shell/dist/assets/*`) y los bundles compartidos (`apps/shell/dist/vendor/*`, incluidos `cells-core.js`, `webawesome.js`, el bundle de React y el de Angular)

### Requirement: Configuración declarativa de Vercel
El despliegue SHALL quedar descrito de forma declarativa en el repositorio, sin depender solo de ajustes manuales del panel de Vercel.

#### Scenario: Configuración presente
- **WHEN** el repositorio se despliega en Vercel
- **THEN** existe un `vercel.json` en la raíz que define el comando de build (`npm run build`), el directorio de salida (`apps/shell/dist`) y el comando de instalación (`npm ci`)

#### Scenario: Versión de Node fijada
- **WHEN** Vercel ejecuta el build
- **THEN** el entorno usa Node >= 22, fijado mediante `engines.node` en el `package.json` raíz (y/o un `.nvmrc`)

### Requirement: Sitio servido y funcional
La aplicación desplegada SHALL ser accesible desde la URL raíz y servir todos sus recursos sin errores 404.

#### Scenario: Carga de la SPA
- **WHEN** se visita la URL raíz del despliegue
- **THEN** se sirve `index.html` y la página de inicio renderiza

#### Scenario: Assets y vendor resueltos
- **WHEN** la página carga
- **THEN** los assets (`/assets/*`) y los bundles compartidos (`/vendor/*`) se resuelven sin errores 404

#### Scenario: Navegación por hash
- **WHEN** se navega a una ruta interna (por ejemplo `#!/preview`)
- **THEN** la página correspondiente renderiza sin requerir reglas de rewrite en el servidor
