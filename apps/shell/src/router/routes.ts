export const loadVendorModule = (name: string): Promise<unknown> =>
  import(/* @vite-ignore */ `/vendor/${name}.js`);

export const routes = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: () => import('../pages/home/home-page'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: 'form-editor-react',
    action: () => loadVendorModule('form-editor-react'),
  },
  {
    path: '/form',
    name: 'form',
    component: 'form-renderer-angular',
    action: async () => {
      await loadVendorModule('angular/browser/polyfills');
      await loadVendorModule('angular/browser/main');
    },
  },
  {
    path: '/preview',
    name: 'preview',
    component: 'preview-page',
    action: async () => {
      await loadVendorModule('form-editor-react');
      await loadVendorModule('angular/browser/polyfills');
      await loadVendorModule('angular/browser/main');
      await import('../pages/preview/preview-page');
    },
  },
  {
    path: '/404',
    name: 'not-found',
    component: 'not-found-page',
    action: () => import('../pages/not-found/not-found-page'),
    notFound: true,
  },
];
