## Purpose

Flujo de formulario dinámico: un editor en React define el esquema, un renderizador en Angular construye el formulario final y los datos enviados vuelven al editor; todo sincronizado por canales y con UI de Web Awesome.

## ADDED Requirements

### Requirement: Edición del esquema
El editor React permite componer un esquema de formulario (campos con tipo, etiqueta y validaciones).

#### Scenario: Añadir un campo
- **WHEN** el usuario añade un campo con nombre, tipo y etiqueta
- **THEN** el campo se añade al esquema y este se publica en `form-schema`

#### Scenario: Eliminar un campo
- **WHEN** el usuario elimina un campo
- **THEN** el campo desaparece del esquema publicado

#### Scenario: Editar propiedades de un campo
- **WHEN** el usuario cambia el tipo, la etiqueta o el estado required de un campo
- **THEN** el esquema publicado refleja los cambios

### Requirement: Renderizado dinámico del formulario
El formulario Angular reconstruye su UI a partir del esquema recibido.

#### Scenario: Recepción del esquema
- **WHEN** Angular recibe un valor en `form-schema`
- **THEN** renderiza un control por campo usando componentes Web Awesome, respetando tipo y required

#### Scenario: Esquema vacío
- **WHEN** el canal `form-schema` no contiene campos
- **THEN** el formulario muestra un estado vacío sin errores

### Requirement: Envío y feedback
El formulario envía los datos y el editor muestra el resultado.

#### Scenario: Envío de datos
- **WHEN** el usuario envía el formulario con datos válidos
- **THEN** Angular publica los valores en `form-submitted` y React muestra la confirmación
