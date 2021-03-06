class OrGate extends Gate{
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
    this.initPins(3, 2);
  }
  get color() {
    return 'orange';
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
    this.setGateOutputState(2, this.pins[0].state || this.pins[1].state);
  }
}
