
class Switch extends Gate{
  constructor(x, y, orientation, options) {
    super(x, y, orientation);
    Object.assign(this, Switch.defaults, options);
    const {state, swapPins} = this;

    const handleClick = () => {
      if (this.state === 'open') {
        this.close();
      } else {
        this.open();
      }
    };

    const rect = this.g.append('rect').attrs({
      x: -25,
      y: -10,
      width: 50,
      height: 20,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'visible'
    });
    rect.node().addEventListener('click', handleClick);

    this.g.append('circle').attrs({
      r: 6,
      cx: -12.5,
      cy: 0,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'none'
    });
    this.g.append('circle').attrs({
      r: 6,
      cx: 12.5,
      cy: 0,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'none'
    });

    this.path = this.g.append('path').attrs({
      fill: 'none',
      stroke: 'grey',
      'stroke-width': 3,
      'pointer-events': 'visible'
    });
    this.path.node().addEventListener('click', handleClick);

    this.wire = this.g.append('polyline').attrs({
      points: [[-12.5, 0], [12.5, 0]],
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      opacity: 0,
      'pointer-events': 'none'
    });

    if (state === 'open') {
      this.open();
    } else {
      this.close();
    }
  }

  drawToggler() {
    const adeg = this.state === 'open' ? 70 : 110;
    const a = adeg * Math.PI / 180;
    const R = 35;
    const r = 7;
    const cp = [R * Math.cos(a), -(10 + R * Math.sin(a))];
    const tp0 = [cp[0] - r * Math.sin(a), cp[1] - r * Math.cos(a)];
    const tp1 = [cp[0] + r * Math.sin(a), cp[1] + r * Math.cos(a)];
    this.path.attr('d',
      ['M', -2.5, -10,
       'L', ...tp0,
       'A', r, r, 0, 0, 1, ...tp1,
       'L', 2.5, -10].join(' ')
    );
  }
  open() {
    if (this.state === 'open') return;
    this.state = 'open';
    this.drawToggler();
    this.wire.attr('opacity', 0);
    this.outputOff();
  }
  close() {
    if (this.state === 'closed') return;
    this.state = 'closed';
    this.drawToggler();
    this.wire.attr('opacity', 1);
    this.outputOn();
  }

  outputPos() {
    return this.position((this.swapPins ? -12.5 : 12.5), 0);
  }
  inputPos(){
    return this.position((this.swapPins ? 12.5 : -12.5), 0);
  }
}
Switch.defaults = {
  state: 'closed',
  swapPins: false,
};
