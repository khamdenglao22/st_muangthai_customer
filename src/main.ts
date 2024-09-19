import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


//  function activeMenuRes() {
//     const titleResMenu = document.querySelector(".responsive .header-sticky.res-head .nav .navs");
//     console.log("test16" );
//     // titleResMenu.style.display = "none"
//   }
