import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('preview-page')
export class PreviewPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1.5rem;
    }

    h1 {
      margin-top: 0;
    }

    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .pane {
      border: 1px solid var(--wa-color-neutral-200, #e5e7eb);
      border-radius: 0.5rem;
      padding: 1rem;
    }

    .pane h2 {
      margin-top: 0;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--wa-color-neutral-600, #4b5563);
    }

    @media (max-width: 800px) {
      .split {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <h1>Vista en paralelo</h1>
      <p>Edita el esquema a la izquierda y observa cómo el formulario de la derecha se reconstruye en vivo.</p>
      <div class="split">
        <div class="pane">
          <h2>React · form-editor-react</h2>
          <form-editor-react></form-editor-react>
        </div>
        <div class="pane">
          <h2>Angular · form-renderer-angular</h2>
          <form-renderer-angular></form-renderer-angular>
        </div>
      </div>
    `;
  }
}
