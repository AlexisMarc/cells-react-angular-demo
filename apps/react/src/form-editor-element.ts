import { createRoot, type Root } from 'react-dom/client';
import { createElement } from 'react';
import { FormEditor } from './FormEditor';
import type { FormSchema } from './types';

const STYLES = `
  :host { display: block; font-family: var(--wa-font-sans, sans-serif); }
  .form-editor { display: flex; flex-direction: column; gap: 1rem; }
  .form-editor__fields { display: flex; flex-direction: column; gap: 0.75rem; }
  .field-row { border: 1px solid var(--wa-color-neutral-200, #e5e7eb); border-radius: 0.5rem; padding: 0.75rem; }
  .field-row__head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
  .field-row__title { font-weight: 600; margin-right: auto; }
  .field-row__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: 0.75rem; align-items: end; }
  .form-editor__empty { color: var(--wa-color-neutral-500, #6b7280); font-style: italic; }
  .form-editor__result { border: 1px solid var(--wa-color-success-300, #86efac); background: var(--wa-color-success-50, #f0fdf4); border-radius: 0.5rem; padding: 0.75rem; }
  .form-editor__result pre { margin: 0.5rem 0 0; font-size: 0.8rem; white-space: pre-wrap; }
  .form-editor__hint { color: var(--wa-color-neutral-500, #6b7280); font-size: 0.85rem; }
`;

export class FormEditorElement extends HTMLElement {
  private root: Root | null = null;
  private title: string | null = null;

  static get observedAttributes(): string[] {
    return ['form-title'];
  }

  connectedCallback(): void {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = STYLES;
      this.shadowRoot!.appendChild(style);
    }
    this.root = createRoot(this.shadowRoot!);
    this.render();
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
  }

  attributeChangedCallback(_name: string, _oldValue: string | null, newValue: string | null): void {
    this.title = newValue;
    this.render();
  }

  private render(): void {
    this.root?.render(
      createElement(FormEditor, {
        initialTitle: this.title ?? undefined,
        onSchemaChange: (schema: FormSchema) => {
          this.dispatchEvent(
            new CustomEvent<FormSchema>('schema-change', {
              detail: schema,
              bubbles: true,
              composed: true,
            }),
          );
        },
      }),
    );
  }
}

customElements.define('form-editor-react', FormEditorElement);
