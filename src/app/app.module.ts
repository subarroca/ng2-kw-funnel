/**
 * @category   Module
 * @package    com.kiwity.ng2-kw-funnel.app
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';




// EXTERNAL




// OWN
import { AppComponent } from './app.component';
import { FunnelModule } from './funnel';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FunnelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
