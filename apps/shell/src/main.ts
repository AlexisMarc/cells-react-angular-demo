import '@awesome.me/webawesome';
import { startApp } from '@open-cells/core';
import './components/app-shell';
import { routes } from './router/routes';

startApp({
  routes,
  mainNode: 'app-content',
});
