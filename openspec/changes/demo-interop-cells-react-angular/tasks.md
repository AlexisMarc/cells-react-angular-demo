## 1. Andamiaje del monorepo

- [x] 1.1 Crear `package.json` raíz con workspaces (`apps/*`) y scripts de build/dev.
- [x] 1.2 Configurar `tsconfig` base y `.gitignore`.
- [x] 1.3 Instalar dependencias raíz y por workspace.

## 2. Shell OpenCells (Lit)

- [x] 2.1 Crear `apps/shell` con Vite, `index.html` (`<div id="app-content">`) e import map para `@open-cells/core` y `@awesome.me/webawesome`.
- [x] 2.2 Definir `routes.ts` (`home`, `editor`, `form`, `preview`) con `action` de carga perezosa.
- [x] 2.3 Implementar `app-shell` Lit con navegación (botones Web Awesome) usando `navigate()`.
- [x] 2.4 Crear la página `home` y la página `preview` que monta los dos custom elements en paralelo.
- [x] 2.5 Arrancar con `startApp({ routes, mainNode: 'app-content' })`.

## 3. Editor dinámico en React

- [x] 3.1 Crear `apps/react` con Vite en modo librería y externalizar `@open-cells/core` y Web Awesome.
- [x] 3.2 Implementar el componente `FormEditor` (añadir/quitar/reordenar campos, tipo, etiqueta, required) con componentes Web Awesome.
- [x] 3.3 Crear el wrapper `HTMLElement` (`form-editor-react`) con `createRoot` en shadow root y sync de props/eventos.
- [x] 3.4 Publicar el esquema en el canal `form-schema` con `publish()` en cada cambio.
- [x] 3.5 Suscribirse a `form-submitted` para mostrar el resultado del envío.

## 4. Formulario final en Angular

- [x] 4.1 Crear `apps/angular` con Angular CLI + `@angular/elements` + `ngx-build-plus`.
- [x] 4.2 Implementar `FormRendererComponent` que renderiza el formulario dinámico a partir del esquema.
- [x] 4.3 Registrar `form-renderer-angular` con `createCustomElement` y habilitar `CUSTOM_ELEMENTS_SCHEMA`.
- [x] 4.4 Suscribirse a `form-schema` con `subscribe()` y reconstruir el formulario reactivamente.
- [x] 4.5 Publicar los datos enviados en el canal `form-submitted`.

## 5. Integración y verificación

- [x] 5.1 Orquestar builds (React lib, Angular bundle, shell) y servirlos juntos en dev.
- [x] 5.2 Verificar el flujo completo: editar esquema → formulario renderizado → envío → feedback.
- [x] 5.3 Verificar la vista en paralelo y la sincronización en vivo por canales.
- [x] 5.4 Documentar cómo levantar el proyecto (README).
