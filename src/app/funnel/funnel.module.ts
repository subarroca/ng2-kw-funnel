/**
 * @category   Module
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';




// EXTERNAL




// OWN
import { FunnelComponent } from './funnel.component';





@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FunnelComponent
  ],
  exports: [
    FunnelComponent
  ]
})
export class FunnelModule { }
