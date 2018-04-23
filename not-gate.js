class NotGate extends Gate{
  constructor(x, y, direction = 0){
    super (x, y, direction);
    this.circle = this.g.append('circle').attrs({
      r: 6,
      cx: 22,
      cy: 0,
      fill: 'none',
      stroke: 'red',
      'stroke-width': 3,
    });
    this.polygon = this.g.append('polygon').attrs({
      points: [[16, 0], [-28, 30], [-28, -30]],
      fill: 'none',
      'stroke-width': 3,
      stroke: 'red',
    });
  }
  outputPos() {
    return this.position(28, 0);
  }
  inputPos(){
    return this.position(-28, 0);
  }
}
