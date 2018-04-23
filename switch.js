class Switch extends Gate{
  constructor(x, y, direction, isOpen=0, swapPins=false) {
    super (x, y, direction);
    this.swapPins = swapPins;
    this.rect = this.g.append('rect').attrs({
      x: -25,
      y: -10,
      width: 50,
      height: 20,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'visible'
    });
    var sw = this;
    function clickHandler() {
      if(sw.isOpen){
        sw.close();
      } else {
        sw.open();
      }
    }
    this.rect.node().addEventListener('click', clickHandler);
    this.circle0 = this.g.append('circle').attrs({
      r: 6,
      cx: -12.5,
      cy: 0,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'none'
    });
    this.circle1 = this.g.append('circle').attrs({
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
    this.path.node().addEventListener('click', clickHandler);
    this.wire = this.g.append('polyline').attrs({
      points: [[-12.5, 0], [12.5, 0]],
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      opacity: 0,
      'pointer-events': 'none'
    });
    if (isOpen){
      this.open();
    } else {
      this.close();
    }
  }
  drawToggler() {
    var adeg;
    if (this.isOpen) adeg = 70;
    else adeg = 110;
    const a = adeg * Math.PI / 180,
          R = 35,
          r = 7,
          cp = [R * Math.cos(a), -(10 + R * Math.sin(a))],
          tp0 = [cp[0] - r * Math.sin(a), cp[1] - r * Math.cos(a)],
          tp1 = [cp[0] + r * Math.sin(a), cp[1] + r * Math.cos(a)];
    this.path.attr('d',
      'M -2.5 -10 L ' + tp0[0] +
      ' ' + tp0[1] + ' ' + 'A ' + r + ' ' + r +
      ' 0 0 1 ' + tp1[0] + ' ' + tp1[1] + ' ' +
      'L 2.5 -10'
    );
  }
  open() {
    this.isOpen = true;
    this.drawToggler();
    this.wire.attr('opacity', 0);
    this.outputOff();
  }
  close() {
    this.isOpen = false;
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
