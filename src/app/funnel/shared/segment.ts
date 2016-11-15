/**
 * @category   Model
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR




// EXTERNAL




// OWN
import { Point } from './point';





export class Segment {
  start: Point;
  end: Point;



  constructor(options: {
    start?: Point,
    end?: Point
  } = {}) {
    this.start = options.start;
    this.end = options.end;
  }
}
