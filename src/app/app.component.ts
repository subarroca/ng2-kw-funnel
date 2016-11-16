/**
 * @category   Component
 * @package    com.kiwity.ng2-kw-funnel.app
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { Component, OnInit } from '@angular/core';




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
export class AppComponent implements OnInit {
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

  mode: string = 'lin'; // 'log'

  testMultiplier = 10;

  data1: number[] = [100, 65, 50, 10];
  data2: number[] = [100, 45, 40, 35];

  segments: FunnelSegment[] = [
    new FunnelSegment({
      value: 100 * this.testMultiplier,
      color: this.colors.purple
    }),
    new FunnelSegment({
      value: 65 * this.testMultiplier,
      color: this.colors.pink
    }),
    new FunnelSegment({
      value: 50 * this.testMultiplier,
      color: this.colors.orange
    }),
    new FunnelSegment({
      value: 10 * this.testMultiplier,
      color: this.colors.yellow,
      labelColor: this.colors.indigo
    })
  ];

  selectedData: number;


  constructor() { }

  ngOnInit() {
    this.setData1();
  }

  setData1() {
    this.selectedData = 1;
    this.segments.forEach((segment, i) => segment.value = this.data1[i]);
  }

  setData2() {
    this.selectedData = 2;
    this.segments.forEach((segment, i) => segment.value = this.data2[i]);
  }

}
