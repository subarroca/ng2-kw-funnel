/**
 * @category   Component
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';


// EXTERNAL
import { Observable } from 'rxjs/Rx';



// OWN
import {
  Segment,
  Point
} from '../shared';



@Component({
  selector: 'g[ng2-kw-funnel-segment]',
  templateUrl: './funnel-segment.component.html',
  styleUrls: ['./funnel-segment.component.scss']
})
export class FunnelSegmentComponent implements OnInit, OnChanges {
  @Input() from: number;
  @Input() to: number;
  @Input() color: string;
  @Input() labelColor: string;
  @Input() max: number;
  @Input() min: number;
  @Input() width: number;
  @Input() height: number;
  @Input() graphMode: string;

  @ViewChild('animate') segmentAnimate: ElementRef;


  slope: number = .2;
  RADIUS: number = 10 / 100;

  previousPath: string;
  currentPath: string;
  _currentPath: string;





  constructor() { }

  ngOnInit() {
    this._currentPath = this.drawInitialSegment();
    this.calculateSegments();
  }

  ngOnChanges(changes) {
    if (changes.graphMode || changes.to || changes.from) {
      this.calculateSegments();
    }
  }


  getLinHeight(): Segment {
    let max = this.max * (1 + this.slope);
    let delta = this.height / max;

    return new Segment({
      start: new Point({
        x: 0,
        y: ((!this.from) ? this.height : this.from * delta) || 0
      }),
      end: new Point({
        x: 0,
        y: this.to * delta || 0
      })
    });
  }

  // THIS IS NOT WORKING
  getLogHeight(): Segment {
    // let max = this.max * (1 + this.slope);
    let logDelta = this.max / this.min;
    // let delta = this.height * Math.log(1 / this.height);

    return new Segment({
      start: new Point({
        x: 0,
        y: ((!this.from) ? this.height : Math.log(logDelta * this.from / this.max) * this.height) || 0
      }),
      end: new Point({
        x: 0,
        y: Math.log(logDelta * this.to / this.max) * this.height || 0
      })
    });
  }








  calculateSegments() {
    this.getPath();

    // animate morphing but let some time to enable morphing in every case
    Observable.timer(0)
      .first()
      .subscribe(timer => {
        this.updateSegments();
      });
  }

  updateSegments() {
    this.currentPath = this._currentPath;

    this.segmentAnimate.nativeElement.beginElement();
  }

  getPath() {
    this.previousPath = this._currentPath;
    this._currentPath = this.getSegment();
  }







  // SEGMENT
  protected drawSegment(segment: Segment): string {
    // from axe right
    // to previous right
    // to end this.slope
    // to current left

    // to -current left
    // to -end this.slope
    // to -previous right

    return `
      M0, ${this.height / 2}
      ${Point.getRoundedCorner(
        {
          x: 0,
          y: this.height / 2 - segment.start.y / 2
        }, {
          x: this.width * this.slope,
          y: this.height / 2 - segment.end.y / 2
        }, {
          x: this.width,
          y: this.height / 2 - segment.end.y / 2
        },
        this.width * this.RADIUS)}
      

      ${Point.getRoundedCorner(
        {
          x: this.width,
          y: this.height / 2 + segment.end.y / 2
        }, {
          x: this.width * this.slope,
          y: this.height / 2 + segment.end.y / 2
        }, {
          x: 0,
          y: this.height / 2 + segment.start.y / 2
        },
        this.width * this.RADIUS)}
      Z`;
  }

  protected drawInitialSegment(): string {
    // from axe right
    // to previous right
    // to end this.slope
    // to current left

    // to -current left
    // to -end this.slope
    // to -previous right

    return `
      M0, ${this.height / 2}
      ${Point.getRoundedCorner(
        {
          x: 0,
          y: this.height / 2
        }, {
          x: this.width * this.slope,
          y: this.height / 2
        }, {
          x: this.width,
          y: this.height / 2
        },
        this.width * this.RADIUS)}
      

      ${Point.getRoundedCorner(
        {
          x: this.width,
          y: this.height / 2
        }, {
          x: this.width * this.slope,
          y: this.height / 2
        }, {
          x: 0,
          y: this.height / 2
        },
        this.width * this.RADIUS)}
      Z`;
  }

  protected getSegment(): string {
    let segment: Segment;

    switch (this.graphMode) {
      case 'lin':
        segment = this.getLinHeight();
        break;

      case 'log':
        segment = this.getLogHeight();
        break;
    }
    return this.drawSegment(segment);
  }

}
