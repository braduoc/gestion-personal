import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // 👈 Esto es obligatorio para que HttpClient funcione
}).catch(err => console.error(err));
