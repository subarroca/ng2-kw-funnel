/**
 * @category   Component
 * @package    com.kiwity.ng2-kw-funnel.app
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { Component } from '@angular/core';




// EXTERNAL




// OWN
import {
  FunnelSegment
} from './funnel';





@Component({
  selector: 'ng2-kw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colors = {
    indigo: '#14143e',
    pink: '#fd1c49',
    orange: '#ff6e00',
    yellow: '#f0c800',
    mint: '#00efab',
    cyan: '#05d1ff',
    purple: '#841386',
    white: '#fff'
  };


  segments: FunnelSegment[] = [
    new FunnelSegment({
      value: 100,
      color: this.colors.purple
    }),
    new FunnelSegment({
      value: 65,
      color: this.colors.pink
    }),
    new FunnelSegment({
      value: 50,
      color: this.colors.orange
    }),
    new FunnelSegment({
      value: 10,
      color: this.colors.yellow,
      labelColor: this.colors.indigo
    })
  ];

}
