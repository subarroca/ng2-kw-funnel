/**
 * @category   Model
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR




// EXTERNAL
import * as _ from 'lodash';




// OWN
import { Segment } from './segment';
import { Point } from './point';




export class FunnelSegment {
	value: number;
	color: string;
	labelColor: string;



	static getLinHeight(
		points: FunnelSegment[],
		step: number,
		direction: number,
		slope: number,
		funnelHeight: number
	): Segment {
		let zenit = FunnelSegment.getLinZenit(points, slope);
		let delta = FunnelSegment.getLinDelta(zenit, direction, funnelHeight);

		return new Segment({
			start: new Point({
				x: 0,
				y: -((step === 0) ? zenit : points[step - 1].value) * delta || 0
			}),
			end: new Point({
				x: 0,
				y: -points[step].value * delta || 0
			})
		});
	}

	static getLogHeight(
		points: FunnelSegment[],
		step: number,
		direction: number,
		slope: number,
		funnelHeight: number
	): Segment {
		let zenit = FunnelSegment.getLogZenit(points, slope);
		let delta = FunnelSegment.getLogDelta(zenit, direction, funnelHeight);

		return new Segment({
			start: new Point({
				x: 0,
				y: -((step === 0) ? zenit : Math.log(points[step - 1].value)) * delta || 0
			}),
			end: new Point({
				x: 0,
				y: -Math.log(points[step].value) * delta || 0
			})
		});
	}

	static getLinVOffset(
		points: FunnelSegment[],
		step: number,
		direction: number,
		slope: number,
		funnelHeight: number,
		height: number,
		minHeight: number
	): Point {
		let zenit = FunnelSegment.getLinZenit(points, slope);
		let delta = FunnelSegment.getLinDelta(zenit, direction, funnelHeight);

		let offset = points[step].value * delta + height / 2;
		return (direction > 0)
			? new Point({
				x: 0,
				y: Math.min(minHeight, offset) || minHeight
			})
			: new Point({
				x: 0,
				y: Math.max(minHeight, offset) || minHeight
			});
	}

	static getLogVOffset(
		points: FunnelSegment[],
		step: number,
		direction: number,
		slope: number,
		funnelHeight: number,
		height: number,
		minHeight: number
	): Point {
		let zenit = FunnelSegment.getLogZenit(points, slope);
		let delta = FunnelSegment.getLogDelta(zenit, direction, funnelHeight);

		let offset = Math.log(points[step].value) * delta + height / 2;

		return (direction > 0)
			? new Point({
				x: 0,
				y: Math.min(minHeight, offset) || minHeight
			})
			: new Point({
				x: 0,
				y: Math.max(minHeight, offset) || minHeight
			});
	}

	static getLinZenit(points: FunnelSegment[], slope: number) {
		return _.max(_.map(points, point => point.value)) * (1 + slope);
	}

	static getLogZenit(points: FunnelSegment[], slope: number) {
		return Math.log(_.max(_.map(points, point => point.value))) * (1 + slope);
	}

	static getLinDelta(zenit: number, direction: number, funnelHeight: number) {
		// invert direction to make it logical when passing param
		return -direction * funnelHeight / zenit;
	}

	static getLogDelta(zenit: number, direction: number, funnelHeight: number) {
		// invert direction to make it logical when passing param
		return -direction * funnelHeight / zenit;
	}



	constructor(options: {
		value?: number,
		color?: string,
		labelColor?: string
	} = {}) {
		this.value = options.value;
		this.color = options.color;
		this.labelColor = options.labelColor || 'white';
	}

	getValue(current, comparative) {
		return (current - comparative);
	}
}
