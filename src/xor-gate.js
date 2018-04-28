class XorGate extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);
    this.g.append('path').attrs({
      d: ['M', -44, -30,
          'h', 24,
          'c', 25, 0, 43, 20, 47.5, 30,
          'c', -4.5, 10, -22.5, 30, -47.5, 30,
          'h', -24,
          'a', 60, 60, 0, 0, 0, 0, -60].join(' '),
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2,
    });
    this.g.append('path').attrs({
      d: ['M', -55, -30,
          'a', 60, 60, 0, 0, 1, 0, 60].join(' '),
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2
    });
    this.initPins(3, 2);
  }
  get color() {
    return 'purple';
  }
  get labelPos() {
    return [-10, 0];
  }
  get pinPositions() {
    return [
      [-38, -15],
      [-38, 15],
      [28, 0],
    ];
  }
  update() {
    const in0 = this.pins[0].state;
    const in1 = this.pins[1].state;
    this.setGateOutputState(2, in0 && !in1 || !in0 && in1);
  }
}
