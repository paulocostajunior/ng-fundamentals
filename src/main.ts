import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EventsAppModule } from './app/events-app.module';


platformBrowserDynamic().bootstrapModule(EventsAppModule)
  .catch(err => console.error(err));
