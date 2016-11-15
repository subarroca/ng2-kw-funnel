/**
 * @category   Component
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { Component, OnInit, Input, QueryList, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';




// EXTERNAL
import { Observable } from 'rxjs/Rx';




// OWN
import {
	Point,
	Segment,
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

	isLoading: boolean = true;
	// on first load do animation straight away
	firstLoad: boolean = true;

	segmentAnimates: QueryList<ElementRef>;

	width: number = 800;
	height: number = 400;


	funnelHeight: number = 180;
	segmentWidth: number = 0;
	funnelSlopeDelta: number = .2;

	RADIUS: number = 10 / 100;



	previousOfflineSegment: string[] = [];
	currentOfflineSegment: string[] = [];
	_currentOfflineSegment: string[] = [];







	constructor(
		protected sanitizer: DomSanitizer
	) {
	}


	ngOnInit() {
		this._segments.forEach((point, k) => this._currentOfflineSegment[k] = this.drawInitialSegment());
		this.calculateSegments();
	}




	// SEGMENT
	protected drawSegment(segment: Segment): string {
		// from axe right
		// to previous right
		// to end slope
		// to current left

		// to -current left
		// to -end slope
		// to -previous right

		return `
      M0, ${this.height / 2}
      ${Point.getRoundedCorner(
				{
					x: 0,
					y: this.height / 2 - segment.start.y
				}, {
					x: this.segmentWidth * this.funnelSlopeDelta,
					y: this.height / 2 - segment.end.y
				}, {
					x: this.segmentWidth,
					y: this.height / 2 - segment.end.y
				},
				this.segmentWidth * this.RADIUS)}
      

      ${Point.getRoundedCorner(
				{
					x: this.segmentWidth,
					y: this.height / 2 + segment.end.y
				}, {
					x: this.segmentWidth * this.funnelSlopeDelta,
					y: this.height / 2 + segment.end.y
				}, {
					x: 0,
					y: this.height / 2 + segment.start.y
				},
				this.segmentWidth * this.RADIUS)}
      Z`;
	}

	protected drawInitialSegment(): string {
		// from axe right
		// to previous right
		// to end slope
		// to current left

		// to -current left
		// to -end slope
		// to -previous right

		return `
      M0, ${this.height / 2}
      ${Point.getRoundedCorner(
				{
					x: 0,
					y: this.height / 2
				}, {
					x: this.segmentWidth * this.funnelSlopeDelta,
					y: this.height / 2
				}, {
					x: this.segmentWidth,
					y: this.height / 2
				},
				this.segmentWidth * this.RADIUS)}
      

      ${Point.getRoundedCorner(
				{
					x: this.segmentWidth,
					y: this.height / 2
				}, {
					x: this.segmentWidth * this.funnelSlopeDelta,
					y: this.height / 2
				}, {
					x: 0,
					y: this.height / 2
				},
				this.segmentWidth * this.RADIUS)}
      Z`;
	}

	protected getSegment(segments: FunnelSegment[], step: number, direction: number): string {
		let segment: Segment;

		switch (this.graphMode) {
			case 'lin':
				segment = FunnelSegment.getLinHeight(
					segments,
					step,
					direction,
					this.funnelSlopeDelta,
					this.funnelHeight
				);
				break;

			case 'log':
				segment = FunnelSegment.getLogHeight(
					segments,
					step,
					direction,
					this.funnelSlopeDelta,
					this.funnelHeight
				);
				break;
		}
		return this.drawSegment(segment);
	}

	getOfflineSegment(step: number) {
		this.previousOfflineSegment[step] = this._currentOfflineSegment[step];
		this._currentOfflineSegment[step] = this.getSegment(this._segments, step, 1);
	}

	getSegmentOpacity(step: number): number {
		return (step + 1) / this._segments.length;
	}




	// HORIZONTAL OFFSET
	getSegmentHOffset(step: number): string {
		return `translate(${step * this.segmentWidth},0)`;
	}






	get viewBox() {
		return `0 0 ${this.width} ${this.height}`;
	}



	calculateSegments() {
		this._segments.forEach((point, k) => this.getOfflineSegment(k));

		if (this.firstLoad) {
			this.firstLoad = false;
			this.updateSegments();
		} else {
			// animate morphing but let some time to enable morphing in every case
			Observable.timer(0, 0)
				.first()
				.subscribe(timer => {
					this.updateSegments();
				});
		}
	}

	updateSegments() {
		this.currentOfflineSegment = this._currentOfflineSegment.slice();

		// this.segmentAnimates.toArray()
		// 	.forEach(animate => animate.nativeElement.beginElement())
	}
}
