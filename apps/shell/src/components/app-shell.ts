import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

@customElement('app-shell')
export class AppShell extends LitElement {
  private elementController = new ElementController(this);

  static styles = css`
    :host {
      display: block;
    }

    header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--wa-color-neutral-200, #e5e7eb);
      background: var(--wa-color-neutral-0, #fff);
    }

    .brand {
      font-weight: 700;
      margin-right: auto;
    }

    .brand span {
      color: var(--wa-color-primary-600, #4f46e5);
    }
  `;

  private go(page: string) {
    this.elementController.navigate(page);
  }

  render() {
    return html`
      <header>
        <span class="brand">Cells <span>×</span> React <span>×</span> Angular</span>
        <wa-button variant="primary" @click=${() => this.go('home')}>Inicio</wa-button>
        <wa-button @click=${() => this.go('editor')}>Editor (React)</wa-button>
        <wa-button @click=${() => this.go('form')}>Formulario (Angular)</wa-button>
        <wa-button @click=${() => this.go('preview')}>Vista en paralelo</wa-button>
      </header>
    `;
  }
}
