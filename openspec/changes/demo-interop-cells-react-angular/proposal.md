## Why

El objetivo es demostrar dominio de Web Components y de OpenCells construyendo una SPA en la que **React y Angular conviven en paralelo** como custom elements, enrutados y comunicados por OpenCells, con la UI construida con **Web Awesome**. El proyecto evidencia que el modelo de Web Components permite montar frameworks heterogéneos en una única aplicación y hacerlos interoperar a través de canales pub/sub sin acoplarlos.

## What Changes

Se crea un monorepo npm workspaces con tres aplicaciones:

- `apps/shell`: aplicación OpenCells (Lit) que arranca con `startApp`, define las rutas y monta los custom elements de React y Angular. Incluye una página de inicio y una vista "en paralelo" que monta ambos frameworks a la vez.
- `apps/react`: editor dinámico de formularios (React 19 + Web Awesome) empaquetado como custom element `<form-editor-react>`. Publica el esquema del formulario en el canal `form-schema`.
- `apps/angular`: formulario final (Angular 22 + `@angular/elements` + Web Awesome) empaquetado como custom element `<form-renderer-angular>`. Se suscribe a `form-schema`, renderiza el formulario dinámicamente y publica los datos enviados en `form-submitted`.

La comunicación entre frameworks se realiza exclusivamente a través de los canales de OpenCells (`publish`/`subscribe` de `@open-cells/core`), compartiendo una única instancia del núcleo mediante un import map.

## Capabilities

### New Capabilities
- `shell`: capa de arranque y enrutado de OpenCells que monta páginas Lit, React y Angular.
- `framework-interop`: coexistencia en paralelo de custom elements React y Angular sobre un único bus de canales Cells.
- `dynamic-form`: editor dinámico (React) y formulario final (Angular) sincronizados por canales, con UI de Web Awesome.

### Modified Capabilities
<!-- Ninguna: proyecto nuevo. -->

## Impact

- Nuevo monorepo con workspaces npm y builds separados (Vite en modo librería para React, Angular CLI + `ngx-build-plus` para Angular, Vite para el shell).
- Dependencias nuevas: `@open-cells/core`, `@open-cells/element-controller`, `@open-cells/page-controller`, `lit`, `@awesome.me/webawesome`, `react`, `react-dom`, `@angular/*`, `@angular/elements`.
- Sin cambios en sistemas existentes (proyecto greenfield).
