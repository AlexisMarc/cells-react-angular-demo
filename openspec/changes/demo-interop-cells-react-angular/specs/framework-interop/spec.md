## Purpose

Permitir que custom elements creados con React y Angular convivan en paralelo dentro de una misma SPA OpenCells y compartan el mismo bus de canales.

## ADDED Requirements

### Requirement: Componentes React como custom element
Un componente React se expone como custom element estándar.

#### Scenario: Registro del custom element React
- **WHEN** se carga el bundle de React
- **THEN** se registra `<form-editor-react>` y renderiza el árbol React dentro de su shadow root

### Requirement: Componentes Angular como custom element
Un componente Angular se expone como custom element con `@angular/elements`.

#### Scenario: Registro del custom element Angular
- **WHEN** se carga el bundle de Angular
- **THEN** se registra `<form-renderer-angular>` y renderiza el componente Angular

### Requirement: Bus de canales compartido
Todos los frameworks usan una única instancia de `@open-cells/core`, de modo que publican y se suscriben al mismo conjunto de canales.

#### Scenario: Publicación y suscripción entre frameworks
- **WHEN** React publica en un canal al que Angular está suscrito
- **THEN** Angular recibe el valor publicado (y viceversa)

### Requirement: Ejecución en paralelo
Ambos frameworks pueden estar montados y activos simultáneamente.

#### Scenario: Vista dividida
- **WHEN** se renderiza una página que monta `<form-editor-react>` y `<form-renderer-angular>` a la vez
- **THEN** ambos componentes están activos y reaccionan a los cambios de canal en vivo
