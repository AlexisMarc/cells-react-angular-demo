export type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
}

export interface FormSchema {
  title: string;
  fields: FormField[];
}

export interface SubmittedData {
  [key: string]: string | boolean | number;
}
