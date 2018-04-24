class AndGate extends Gate {
  constructor(x, y, orientation='right') {
    super(x, y, orientation);
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
    return this.position(-28, inputNum === 0 ? -15 : 15);
  }
}
