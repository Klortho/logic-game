class OrGate extends Gate{
  constructor(x, y, direction = 0){
    super (x, y, direction);
    this.g.append('path').attrs({
      d: 'M ' + (-47.5) + ',' + (-30) +
        ' h 32.5 a 100 100 0 0 1 47.5 30 a 100 100 ' +
        '0 0 1 -47.5 30 h -32.5 a 60 60 0 0 0 0 -60',
      fill: 'none',
      stroke: 'orange',
      'stroke-width': 3,
    });
  }
  outputPos() {
    return this.position(32.5, 0);
  }
  inputPos(inputNum){
    var dy;
    if (inputNum === 0) dy = -15;
    else if (inputNum === 1) dy = 15;
    return this.position(-42, dy);
  }
}
