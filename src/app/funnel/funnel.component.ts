/**
 * @category   Component
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';




// EXTERNAL




// OWN
import {
  FunnelSegment
} from './shared';





@Component({
  selector: 'ng2-kw-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss']
})
export class FunnelComponent implements OnInit {
  @Input() graphMode: string = 'log';
  @Input() set segments(segments: FunnelSegment[]) {
    this._segments = segments;
    this.segmentWidth = this.width / segments.length;
  }
  _segments: FunnelSegment[];


  width: number = 800;
  height: number = 400;


  funnelHeight: number = 400;
  segmentWidth: number = 0;




  constructor(
    protected sanitizer: DomSanitizer
  ) {
  }


  ngOnInit() {
  }

  getSegmentOffset(step: number): string {
    return `translate(${step * this.segmentWidth},0)`;
  }

  get viewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }
}
