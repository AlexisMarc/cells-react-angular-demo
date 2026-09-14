import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { publish, subscribe, unsubscribe } from '@open-cells/core';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface FormSchema {
  title: string;
  fields: FormField[];
}

@Component({
  selector: 'form-renderer-root',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="form-renderer">
      <h2 class="form-renderer__title">{{ schema().title || 'Formulario' }}</h2>

      @if (schema().fields.length === 0) {
        <p class="form-renderer__empty">El formulario está vacío. Añade campos desde el editor.</p>
      } @else {
        <div class="form-renderer__fields">
          @for (field of schema().fields; track field.id) {
            <div class="form-renderer__field">
              @switch (field.type) {
                @case ('textarea') {
                  <wa-textarea
                    [label]="field.label"
                    [required]="field.required"
                    [value]="valueOf(field)"
                    (input)="onFieldInput(field.id, $event)"
                  ></wa-textarea>
                }
                @case ('select') {
                  <wa-select
                    [label]="field.label"
                    [required]="field.required"
                    (change)="onFieldInput(field.id, $event)"
                  >
                    <wa-option value="opcion-1">Opción 1</wa-option>
                    <wa-option value="opcion-2">Opción 2</wa-option>
                    <wa-option value="opcion-3">Opción 3</wa-option>
                  </wa-select>
                }
                @default {
                  <wa-input
                    [type]="field.type"
                    [label]="field.label"
                    [required]="field.required"
                    [value]="valueOf(field)"
                    (input)="onFieldInput(field.id, $event)"
                  ></wa-input>
                }
              }
            </div>
          }

          @if (error) {
            <p class="form-renderer__error">{{ error }}</p>
          }

          <wa-button variant="primary" (click)="onSubmit()">Enviar</wa-button>
        </div>
      }
    </div>
  `,
  styles: `
    .form-renderer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-family: var(--wa-font-sans, sans-serif);
    }

    .form-renderer__title {
      margin: 0;
    }

    .form-renderer__fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-renderer__empty {
      color: var(--wa-color-neutral-500, #6b7280);
      font-style: italic;
    }

    .form-renderer__error {
      color: var(--wa-color-danger-600, #dc2626);
      font-size: 0.9rem;
      margin: 0;
    }
  `,
})
export class FormRendererComponent implements OnInit, OnDestroy {
  schema = signal<FormSchema>({ title: '', fields: [] });
  values: Record<string, string> = {};
  error = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    subscribe('form-schema', this.elementRef.nativeElement, (schema: FormSchema) => {
      this.schema.set(schema ?? { title: '', fields: [] });
      this.values = {};
      this.error = '';
    });
  }

  ngOnDestroy(): void {
    unsubscribe('form-schema', this.elementRef.nativeElement);
  }

  valueOf(field: FormField): string {
    return this.values[field.id] ?? '';
  }

  onFieldInput(id: string, event: Event): void {
    this.values[id] = (event.target as HTMLInputElement).value;
  }

  onSubmit(): void {
    const fields = this.schema().fields;
    const missing = fields.filter((f) => f.required && !this.valueOf(f));

    if (missing.length > 0) {
      this.error = `Faltan campos requeridos: ${missing.map((f) => f.label || f.name).join(', ')}`;
      return;
    }

    this.error = '';
    const data = fields.reduce(
      (acc, field) => {
        acc[field.name || field.id] = this.valueOf(field);
        return acc;
      },
      {} as Record<string, string>,
    );

    publish('form-submitted', data);
  }
}
