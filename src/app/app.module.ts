import 'hammerjs'; // Gesture Support

// @angular
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MdButtonModule, MdInputModule, MdCardModule} from '@angular/material';

// Components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

// Services
import {SearchService} from './search.service';

// App
import {appRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    // Register routes
    RouterModule.forRoot(appRoutes),

    // Angular Material modules
    MdButtonModule,
    MdInputModule,
    MdCardModule,

    // Http
    HttpModule,
    JsonpModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
