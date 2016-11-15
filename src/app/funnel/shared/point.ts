/**
 * @category   Model
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR




// EXTERNAL




// OWN






export class Point {
  x: number;
  y: number;



  static getRoundedCorner(start: Point, mid: Point, end: Point, radius: number) {
    // y = mx + b
    let m1 = (start.y - mid.y) / (start.x - mid.x);
    let m2 = (mid.y - end.y) / (mid.x - end.x);
    let b1 = mid.y - m1 * mid.x;
    let b2 = mid.y - m2 * mid.x;

    let direction = start.x < end.x ? 1 : -1;
    let startmid: Point = new Point({
      x: mid.x - radius * direction,
      y: m1 * (mid.x - radius * direction) + b1
    });

    let midend: Point = new Point({
      x: mid.x + radius * direction,
      y: m2 * (mid.x + radius * direction) + b2
    });


    return `L${start.x},${start.y}
      L${startmid.x},${startmid.y}
      Q${mid.x},${mid.y},
       ${midend.x},${midend.y}
      L${end.x},${end.y}`;
  }




  constructor(options: {
    x?: number,
    y?: number
  } = {}) {
    this.x = options.x;
    this.y = options.y;
  }
}
