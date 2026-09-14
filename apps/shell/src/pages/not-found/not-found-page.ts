import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
  private pageController = new PageController(this);

  static styles = css`
    :host {
      display: block;
      padding: 3rem 1.5rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <wa-button variant="primary" @click=${() => this.pageController.navigate('home')}>
        Volver al inicio
      </wa-button>
    `;
  }
}
