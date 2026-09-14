import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';

@customElement('home-page')
export class HomePage extends LitElement {
  private pageController = new PageController(this);

  static styles = css`
    :host {
      display: block;
      padding: 2rem 1.5rem;
      max-width: 60rem;
      margin: 0 auto;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    wa-card {
      cursor: pointer;
    }
  `;

  private go(page: string) {
    this.pageController.navigate(page);
  }

  render() {
    return html`
      <h1>Interoperabilidad de frameworks con Web Components</h1>
      <p>
        Esta SPA demuestra cómo <strong>React</strong> y <strong>Angular</strong> conviven como
        <em>custom elements</em> dentro de una única aplicación orquestada por
        <strong>OpenCells</strong>, comunicándose por canales pub/sub y con la UI construida con
        <strong>Web Awesome</strong>.
      </p>

      <div class="cards">
        <wa-card @click=${() => this.go('editor')}>
          <strong>Editor dinámico</strong>
          <p slot="footer">React publica el esquema en <code>form-schema</code>.</p>
        </wa-card>
        <wa-card @click=${() => this.go('form')}>
          <strong>Formulario final</strong>
          <p slot="footer">Angular se suscribe y publica en <code>form-submitted</code>.</p>
        </wa-card>
        <wa-card @click=${() => this.go('preview')}>
          <strong>Vista en paralelo</strong>
          <p slot="footer">Ambos frameworks montados a la vez.</p>
        </wa-card>
      </div>
    `;
  }
}
