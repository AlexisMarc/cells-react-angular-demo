import { useEffect, useRef, useState } from 'react';
import { publish, subscribe, unsubscribe } from '@open-cells/core';
import type { FieldType, FormField, FormSchema, SubmittedData } from './types';

let idCounter = 0;
const nextId = (): string => `field-${Date.now()}-${++idCounter}`;

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Texto' },
  { value: 'email', label: 'Correo' },
  { value: 'number', label: 'Número' },
  { value: 'textarea', label: 'Área de texto' },
  { value: 'select', label: 'Desplegable' },
];

const EMPTY_SCHEMA: FormSchema = { title: 'Formulario dinámico', fields: [] };

export interface FormEditorProps {
  initialTitle?: string;
  onSchemaChange?: (schema: FormSchema) => void;
}

interface FieldRowProps {
  field: FormField;
  index: number;
  total: number;
  onChange: (id: string, patch: Partial<FormField>) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
}

function FieldRow({ field, index, total, onChange, onRemove, onMove }: FieldRowProps) {
  return (
    <div className="field-row">
      <div className="field-row__head">
        <span className="field-row__title">Campo {index + 1}</span>
        <wa-button size="small" disabled={index === 0} onClick={() => onMove(field.id, -1)}>
          ↑
        </wa-button>
        <wa-button size="small" disabled={index === total - 1} onClick={() => onMove(field.id, 1)}>
          ↓
        </wa-button>
        <wa-button size="small" variant="danger" onClick={() => onRemove(field.id)}>
          Quitar
        </wa-button>
      </div>

      <div className="field-row__grid">
        <wa-input
          label="Nombre"
          value={field.name}
          onInput={(e) => onChange(field.id, { name: (e.target as HTMLInputElement).value })}
        />
        <wa-input
          label="Etiqueta"
          value={field.label}
          onInput={(e) => onChange(field.id, { label: (e.target as HTMLInputElement).value })}
        />
        <wa-select
          label="Tipo"
          value={field.type}
          onChange={(e) =>
            onChange(field.id, { type: (e.target as HTMLSelectElement).value as FieldType })
          }
        >
          {FIELD_TYPES.map((t) => (
            <wa-option key={t.value} value={t.value}>
              {t.label}
            </wa-option>
          ))}
        </wa-select>
        <wa-checkbox
          checked={field.required}
          onChange={(e) => onChange(field.id, { required: (e.target as HTMLInputElement).checked })}
        >
          Requerido
        </wa-checkbox>
      </div>
    </div>
  );
}

export function FormEditor({ initialTitle, onSchemaChange }: FormEditorProps) {
  const [schema, setSchema] = useState<FormSchema>(() => ({
    ...EMPTY_SCHEMA,
    title: initialTitle ?? EMPTY_SCHEMA.title,
  }));
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const onSchemaChangeRef = useRef(onSchemaChange);
  useEffect(() => {
    onSchemaChangeRef.current = onSchemaChange;
  });

  useEffect(() => {
    const node = hostRef.current;
    if (node) {
      publish('form-schema', schema);
      subscribe('form-submitted', node, (data: SubmittedData) => {
        setSubmitted(data);
      });
    }

    return () => {
      if (node) {
        unsubscribe('form-submitted', node);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSchema = (updater: (prev: FormSchema) => FormSchema) => {
    setSchema((prev) => {
      const next = updater(prev);
      publish('form-schema', next);
      onSchemaChangeRef.current?.(next);
      return next;
    });
  };

  const addField = () => {
    updateSchema((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        { id: nextId(), name: '', label: '', type: 'text', required: false },
      ],
    }));
  };

  const removeField = (id: string) => {
    updateSchema((prev) => ({ ...prev, fields: prev.fields.filter((f) => f.id !== id) }));
  };

  const moveField = (id: string, direction: -1 | 1) => {
    updateSchema((prev) => {
      const fields = [...prev.fields];
      const index = fields.findIndex((f) => f.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= fields.length) return prev;
      [fields[index], fields[target]] = [fields[target], fields[index]];
      return { ...prev, fields };
    });
  };

  const updateField = (id: string, patch: Partial<FormField>) => {
    updateSchema((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  };

  return (
    <div ref={hostRef} className="form-editor">
      <wa-input
        label="Título del formulario"
        value={schema.title}
        onInput={(e) =>
          updateSchema((prev) => ({ ...prev, title: (e.target as HTMLInputElement).value }))
        }
      />

      <div className="form-editor__fields">
        {schema.fields.length === 0 ? (
          <p className="form-editor__empty">Aún no hay campos. Añade el primero.</p>
        ) : (
          schema.fields.map((field, index) => (
            <FieldRow
              key={field.id}
              field={field}
              index={index}
              total={schema.fields.length}
              onChange={updateField}
              onRemove={removeField}
              onMove={moveField}
            />
          ))
        )}
      </div>

      <wa-button variant="primary" onClick={addField}>
        Añadir campo
      </wa-button>

      {submitted ? (
        <div className="form-editor__result">
          <strong>Datos recibidos del formulario:</strong>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      ) : (
        <p className="form-editor__hint">El resultado del envío aparecerá aquí.</p>
      )}
    </div>
  );
}
