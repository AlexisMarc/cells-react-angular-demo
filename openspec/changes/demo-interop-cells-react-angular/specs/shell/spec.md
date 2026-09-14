## Purpose

Arranque, enrutado y composición de la SPA con OpenCells: monta las páginas (Lit, React y Angular) dentro de un único nodo raíz y permite navegar entre ellas.

## ADDED Requirements

### Requirement: Arranque de la aplicación
OpenCells inicia la SPA a partir de una configuración de rutas y un nodo principal.

#### Scenario: Inicio de la aplicación
- **WHEN** se carga `index.html` y se ejecuta `startApp`
- **THEN** el router se inicializa y renderiza la página de la ruta raíz dentro de `mainNode`

### Requirement: Enrutado multi-framework
El router asocia rutas a custom elements de distintos frameworks y los carga de forma perezosa.

#### Scenario: Navegación a una página React
- **WHEN** se navega a la ruta del editor
- **THEN** se ejecuta la `action` de la ruta y se monta el custom element React `<form-editor-react>`

#### Scenario: Navegación a una página Angular
- **WHEN** se navega a la ruta del formulario
- **THEN** se ejecuta la `action` de la ruta y se monta el custom element Angular `<form-renderer-angular>`

#### Scenario: Ruta no encontrada
- **WHEN** se solicita una ruta inexistente
- **THEN** se renderiza la página marcada como `notFound`

### Requirement: Navegación programática
Los componentes pueden navegar usando el API del router.

#### Scenario: Navegación desde el shell
- **WHEN** el usuario pulsa un enlace del shell
- **THEN** se invoca `navigate(name)` y cambia la página activa
