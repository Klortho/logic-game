class AndGate extends Gate {
  constructor(x, y, direction=0) {
    super(x, y, direction);
    this.g.append('path').attrs({
      d: ['M', -2, -30,
          'h', -26,
          'v', 60,
          'h', 26,
          'a', 30, 30, 0, 0, 0, 0, -60].join(' '),
      fill: 'none',
      stroke: 'green',
      'stroke-width': 3,
    });
  }
  outputPos() {
    return this.position(28, 0);
  }
  inputPos(inputNum) {
    var dy;
    if (inputNum === 0) dy = -15;
    else if (inputNum === 1) dy = 15;
    return this.position(-28, dy);
  }
}
