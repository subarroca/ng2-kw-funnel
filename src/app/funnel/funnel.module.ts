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
import { FunnelSegmentComponent } from './funnel-segment/funnel-segment.component';





@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FunnelComponent,
    FunnelSegmentComponent
  ],
  exports: [
    FunnelComponent
  ]
})
export class FunnelModule { }
