import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { FormRendererComponent } from './app/form-renderer.component';

createApplication().then((appRef) => {
  const elementConstructor = createCustomElement(FormRendererComponent, {
    injector: appRef.injector,
  });

  customElements.define('form-renderer-angular', elementConstructor);
});
