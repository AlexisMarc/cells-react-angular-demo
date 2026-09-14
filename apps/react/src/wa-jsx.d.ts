import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';

type WaElementProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  style?: CSSProperties;
  [key: string]: unknown;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wa-button': WaElementProps<HTMLElement>;
      'wa-input': WaElementProps<HTMLElement>;
      'wa-select': WaElementProps<HTMLElement>;
      'wa-option': WaElementProps<HTMLElement>;
      'wa-checkbox': WaElementProps<HTMLElement>;
      'wa-textarea': WaElementProps<HTMLElement>;
      'wa-card': WaElementProps<HTMLElement>;
      'wa-icon-button': WaElementProps<HTMLElement>;
      'wa-tag': WaElementProps<HTMLElement>;
      'wa-divider': WaElementProps<HTMLElement>;
      'wa-callout': WaElementProps<HTMLElement>;
    }
  }
}
