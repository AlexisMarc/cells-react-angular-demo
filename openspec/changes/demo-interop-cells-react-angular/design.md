## Context

Proyecto nuevo (greenfield). Se requiere demostrar: (1) Web Components como modelo de componentización común, (2) OpenCells como orquestador (routing + estado pub/sub + bootstrap) y (3) interoperabilidad entre React, Angular y Web Awesome dentro de una misma SPA.

Restricciones del problema:
- React no genera web components de forma nativa; hay que envolver el árbol React en un `HTMLElement`.
- Angular sí los genera con `@angular/elements`.
- Los canales de OpenCells son pub/sub (RxJS) de un solo valor, accesibles vía `ElementController` **o** vía las funciones sueltas `publish`/`subscribe` exportadas por `@open-cells/core`.
- Para que React y Angular compartan el mismo bus, deben importar la **misma instancia** de `@open-cells/core` (el estado del bridge `$bridge` vive a nivel de módulo).

## Goals / Non-Goals

**Goals:**
- Montar React y Angular como custom elements y enrutarlos con Cells.
- Mostrar ambos frameworks renderizándose en paralelo en la misma pantalla.
- Comunicación bidireccional por canales (esquema → formulario → datos enviados).
- UI construida íntegramente con Web Awesome.

**Non-Goals:**
- Persistencia real (backend/BD).
- SSR, autenticación, tests E2E formales, i18n.
- Microfrontends distribuidos/federation (se usa un único shell con import map).

## Decisions

### D1. Monorepo npm workspaces + builds independientes
Estructura `apps/shell`, `apps/react` y `apps/angular` bajo workspaces npm. Cada framework se compila por separado a un bundle ES que registra su custom element; el shell (Vite) sirve la aplicación y carga los bundles de React/Angular como assets. Alternativa descartada: Nx (más infraestructura de la necesaria para un demo).

### D2. Compartir una única instancia de `@open-cells/core` mediante import map
El estado del bridge (`$bridge`) es a nivel de módulo, por lo que bundles que embeban su propia copia no compartirían canales. Se usa un `<script type="importmap">` en el `index.html` del shell que resuelve `@open-cells/core` (y `@awesome.me/webawesome`) a un único artefacto. React y Angular marcan esas dependencias como `external`. Alternativa descartada: usar `window.$bridge`/`window.cellsBridgeQueue` directamente (acopla al flag `debug` y a internals no documentados).

### D3. React → custom element mediante wrapper manual
Se crea una clase que extiende `HTMLElement`, monta `createRoot` de React 19 en un shadow root y sincroniza atributos→props y eventos. Muestra el dominio del estándar sin librerías extra. Alternativa considerada: `react-to-web-component` (r2wc); se documenta como opción.

### D4. Angular → custom element con `@angular/elements`
Se usa `createCustomElement` + `customElements.define('form-renderer-angular', ...)`. Build con Angular CLI y `ngx-build-plus` para producir un bundle único cargable por el shell. Se activa `CUSTOM_ELEMENTS_SCHEMA` para usar Web Awesome en plantillas.

### D5. Comunicación por canales nombrados
- `form-schema`: React publica `{ title, fields: [...] }`.
- `form-submitted`: Angular publica los valores enviados.

React y Angular importan `publish`/`subscribe` directamente desde `@open-cells/core` (no necesitan `ElementController`, que exige Lit). Las páginas Lit del shell usan `ElementController`/`PageController` para la navegación.

### D6. Vista "en paralelo"
Una ruta `preview` del shell monta `<form-editor-react>` y `<form-renderer-angular>` lado a lado para evidenciar la sincronización en vivo por canales (al ser de un solo valor, el suscriptor recibe el último estado al montarse).

### D7. Web Awesome como único kit de UI
Tema por defecto + librería vía import map. Los componentes `wa-*` se usan dentro de React (JSX con refs/eventos), Angular (plantillas + `CUSTOM_ELEMENTS_SCHEMA`) y el shell Lit.

## Risks / Trade-offs

- **Duplicidad de runtime**: React (`react-dom`) y Angular (`zone.js` + runtime) cargan runtimes pesados; aceptable para un demo.
- **Sincronización de módulos**: si el import map no se configura bien habrá dos `$bridge` y los canales no se compartirán. Se mitiga con D2 y una verificación en el arranque.
- **Angular + Shadow DOM/estilos**: Web Awesome estiliza con estilos propios; hay que validar compatibilidad con la encapsulación de Angular.
- **Binding de propiedades complejas**: Web Awesome usa propiedades (no atributos) para valores complejos; en React se usan refs/props y en Angular `[prop]`/`(event)`. Se cubre con un ejemplo mínimo verificado.
