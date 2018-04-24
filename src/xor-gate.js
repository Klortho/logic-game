class XorGate extends Gate{
  constructor(x, y, orientation='right'){
    super (x, y, orientation);
    this.g.append('path').attrs({
      d: ['M', -47.5, -30,
        'h', 32.5,
        'a', 100, 100, 0, 0, 1, 47.5, 30,
        'a', 100, 100, 0, 0, 1, -47.5, 30,
        'h', -32.5,
        'a', 60, 60, 0, 0, 0, 0, -60].join(' '),
      fill: 'none',
      stroke: 'purple',
      'stroke-width': 3,
    });
    this.g.append('path').attrs({
      d: ['M', -55, -30, 'a', 60, 60, 0, 0, 1, 0, 60].join(' '),
      fill: 'none',
      stroke: 'purple',
      'stroke-width': 3
    });
  }
  outputPos() {
    return this.position(32.5, 0);
  }
  inputPos(inputNum){
    return this.position(-42, inputNum === 0 ? -15 : 15);
  }
}
