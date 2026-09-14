# Cells × React × Angular Demo

Demostración de interoperabilidad entre frameworks usando **Web Components** y
**OpenCells**: una SPA en la que **React** y **Angular** conviven como *custom elements*,
enrutados y comunicados por OpenCells, con la UI construida con **Web Awesome**.

## Arquitectura

Monorepo npm con tres aplicaciones (`apps/*`):

| App       | Framework            | Custom element          | Rol                                                                 |
| --------- | -------------------- | ----------------------- | ------------------------------------------------------------------ |
| `shell`   | OpenCells + Lit      | —                       | Bootstrap, enrutado y navegación. Sirve los bundles y el import map. |
| `react`   | React 19             | `<form-editor-react>`   | Editor dinámico que publica el esquema en el canal `form-schema`.    |
| `angular` | Angular 22 (+ Elements) | `<form-renderer-angular>` | Renderiza el formulario y publica los datos en `form-submitted`.    |

Los tres comparten una **única instancia** de `@open-cells/core` (y de Web Awesome) mediante un
`<script type="importmap">` en el `index.html` del shell. React y Angular marcan esas
dependencias como externas en sus builds, de modo que el bus de canales (`$bridge`) es el mismo
para todos.

### Canales de comunicación

- `form-schema`: React publica `{ title, fields: [...] }` en cada cambio.
- `form-submitted`: Angular publica los valores enviados.

## Requisitos

- Node.js >= 22
- npm >= 10 (usa workspaces)

## Instalación

```bash
npm install
```

## Desarrollo

Construye los bundles de React y Angular (se sirven como assets del shell) y arranca el
servidor de desarrollo de Vite:

```bash
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

El resultado queda en `apps/shell/dist`. Para servirlo:

```bash
npm run build:shell
npx vite preview --outDir apps/shell/dist
```

O usa cualquier servidor estático sobre `apps/shell/dist`.

## Scripts

| Comando                | Descripción                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Build de React + Angular y dev server del shell.                   |
| `npm run build`        | Build completo (React → Angular → Shell).                          |
| `npm run build:react`  | Solo el editor React (`form-editor-react.js`).                     |
| `npm run build:angular`| Solo el formulario Angular.                                        |
| `npm run build:shell`  | Solo el shell (genera también `vendor/cells-core.js` y Web Awesome). |
| `npm run dev:shell`    | Dev server del shell (requiere haber construido React y Angular).  |

## Cómo funciona el demo

1. **Inicio** (`/#!`): página de bienvenida con accesos a las vistas.
2. **Editor (React)** (`/#!editor`): añade, elimina, reordena y edita campos (tipo, etiqueta,
   required). Cada cambio se publica en `form-schema`.
3. **Formulario (Angular)** (`/#!form`): se suscribe a `form-schema` y reconstruye el formulario
   con Web Awesome. Al enviar, publica los datos en `form-submitted`.
4. **Vista en paralelo** (`/#!preview`): monta ambos custom elements lado a lado para ver la
   sincronización en vivo por canales.

## Notas de implementación

- `@open-cells/core` se empaqueta en un único ESM (`vendor/cells-core.js`) y se comparte vía
  import map. React y Angular lo marcan como `external`.
- Web Awesome se agrupa (componentes usados + tema por defecto) en `vendor/webawesome.js` y
  `vendor/webawesome.css`, también resuelto por import map.
- React se envuelve manualmente en un `HTMLElement` (`createRoot` en shadow root, sync de
  atributos y emisión de `schema-change`).
- Angular usa `createCustomElement` + `createApplication` y el builder `@angular/build:application`
  con `externalDependencies` (equivalente moderno a `ngx-build-plus` para este caso).
