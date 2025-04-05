import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import AOS from 'aos';


bootstrapApplication(AppComponent, appConfig)
  .then(()=>{
    AOS.init();
  })
  .catch(err => console.error(err));
