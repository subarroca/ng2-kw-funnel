/**
 * @category   Model
 * @package    com.kiwity.ng2-kw-funnel.funnel
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR




// EXTERNAL




// OWN




export class FunnelSegment {
  value: number;
  color: string;
  labelColor: string;



  constructor(options: {
    value?: number,
    color?: string,
    labelColor?: string
  } = {}) {
    this.value = options.value;
    this.color = options.color;
    this.labelColor = options.labelColor || 'white';
  }
}
