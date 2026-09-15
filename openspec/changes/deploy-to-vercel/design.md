## Context

- Monorepo npm con workspaces (`apps/shell`, `apps/react`, `apps/angular`). El build raíz (`npm run build`) encadena react → angular → shell, y el shell (Vite) produce el sitio estático en `apps/shell/dist`.
- La SPA usa hash routing (`#!`), por lo que el servidor solo sirve `/` y los assets estáticos; no necesita rewrites de SPA.
- `@open-cells/core` exige Node >=22 y Vite 8 exige >=20.19. Vercel puede usar otra versión por defecto.
- Existe un remoto Git (GitHub: `AlexisMarc/cells-react-angular-demo`).
- El `index.html` usa rutas absolutas (`/assets/...`, `/vendor/...`), válidas cuando el sitio se sirve desde la raíz del dominio.

## Goals / Non-Goals

**Goals:**
- Desplegar el build estático del shell en Vercel de forma reproducible y declarativa.
- Documentar el despliegue en el README.

**Non-Goals:**
- SSR o funciones serverless.
- Dominios personalizados.
- CI adicional más allá de lo que la integración GitHub→Vercel ya ofrece (previews por PR).

## Decisions

### D1. Despliegue estático (no serverless)
La app es una SPA estática con hash routing; Vercel la sirve como sitio estático sin funciones. Alternativa descartada: adaptar a `@vercel/node` o SSR (innecesario y añade complejidad).

### D2. Proyecto Vercel apuntando a la raíz del repo + `vercel.json`
El build necesita las tres apps (workspaces), por lo que el proyecto Vercel debe usar la raíz del repo como Root Directory. Un `vercel.json` en la raíz fija:
- `buildCommand`: `npm run build`
- `outputDirectory`: `apps/shell/dist`
- `installCommand`: `npm ci`

Alternativa descartada: fijar Root Directory en `apps/shell` (no resolvería las dependencias de `@cells/react` y `@cells/angular` que el build necesita).

### D3. Fijar Node >=22
Añadir `engines.node` (`>=22`) al `package.json` raíz (y opcionalmente un `.nvmrc` con `22`) para que Vercel use la versión correcta.

### D4. Sin rewrites SPA
El hash routing hace innecesarias las reglas de rewrite. Se documenta para evitar añadir una config fallback que no aporta.

### D5. Integración con GitHub (alternativa por CLI)
Asumir el despliegue desde GitHub (push → build → deploy) y documentar la alternativa con la CLI de Vercel (`vercel`), que produce el mismo build.

## Risks / Trade-offs

- **Rutas absolutas en el HTML** → Si el sitio se sirve desde la raíz del dominio (caso por defecto en Vercel), funcionan; si se despliega en un subpath habría que configurar `base` en Vite. Mitigación: documentar la limitación.
- **Primera build lenta** (descarga React + Angular + Web Awesome) → Mitigación: caché de build de Vercel.
- **Versión de Node** → Mitigación: D3 fija `engines.node` para evitar fallos de `@open-cells/core`/Vite 8.

## Migration Plan

1. Añadir `vercel.json` y `engines.node` (o `.nvmrc`).
2. Importar el repo en Vercel y desplegar.
3. Verificar la URL desplegada; en caso de problema, revertir eliminando `vercel.json` o desenlazando el proyecto en Vercel (el runtime no cambia).

## Open Questions

<!-- Ninguna: el método de despliegue (GitHub vs CLI) no altera la configuración ni las tareas; se asume GitHub con alternativa CLI documentada. -->
